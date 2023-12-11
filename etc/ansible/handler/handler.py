import json
import subprocess

# Imports json produced by webpage as dictionary "data_post" and "data_files"
with open('/var/www/uploads/infra_variables.json', 'r') as f:
    data_post = json.load(f)
with open('/var/www/uploads/infra_files.json', 'r') as f:
    data_files = json.load(f)

# Takes the last octet of the deployable targets first available host and stores it as an int
host_address = [int(data_post['deploy']['first_host'].rsplit('.', 1)[-1])]

# Stores the IP for target Vagrant environment
vmbox_ip = data_post['deploy']['ip']

# Declares path to generate new hosts file
inventory_path = '/etc/ansible/handler/generated_hosts.ini'


def run_playbook(playbook_path, extra_vars):
    command = [
        'ansible-playbook',
        '-i', inventory_path,
        playbook_path,
        '--extra-vars', json.dumps(extra_vars)
    ]

    try:
        subprocess.run(command, check=True)
        print("Ansible playbook executed successfully!")
    except subprocess.CalledProcessError as e:
        print(f"Error executing Ansible playbook: {e}")


# Generates incremental unique IP addresses and assigns them to VM's in data_post
def generate_ip(key, index):
    # Will not post if off, exists only when selected
    data_post[key][index]['ip'] = '192.168.0.' + str(host_address[0])
    host_address[0] += 1
    return data_post[key][index]['ip']


# Converts packages string into list of packages
if 'custom' in data_post:
    for i in range(len(data_post['custom'])):
        data_post['custom'][i]['packages'] = data_post['custom'][i]['packages'].split(' ')

# Writes properly formatted host file for ansible.
with open(inventory_path, 'w') as inventory_gen:
    for server_type in ['web', 'db', 'custom']:
        if server_type in data_post:
            inventory_gen.write(f'[{server_type}]\n')
            for i in range(len(data_post[server_type])):
                inventory_gen.write(generate_ip(server_type, i) + '\n')

    inventory_gen.write('[vagrant]\n')
    inventory_gen.write(vmbox_ip + '\n')

print("generated host file")

run_playbook('/etc/ansible/playbooks/initialize-vagrant.yml', '')
for server_type in ['web', 'db', 'custom']:
    if server_type in data_post:
        for i in range(len(data_post[server_type])):
            if server_type == 'web' or server_type == 'db':
                data_post[server_type][i]['file'] = data_files[server_type]['name'][i]['files']
            run_playbook('/etc/ansible/playbooks/build-vm.yml', data_post[server_type][i])
            if server_type == 'web':
                run_playbook('/etc/ansible/playbooks/webserver.yml', data_post[server_type][i])
            if server_type == 'db':
                run_playbook('/etc/ansible/playbooks/database/build-mariadb.yml', data_post[server_type][i])
            if server_type == 'custom':
                run_playbook('/etc/ansible/playbooks/custom-install.yml', data_post[server_type][i])

print("handler.py completed successfully")
