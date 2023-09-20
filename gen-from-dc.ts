const text = await Deno.readTextFile("./data/dcobj.json");
//console.log(text);

const data = JSON.parse(text);
// console.log(data);

const rangeNames = ['alfa', 'beta', 'gamma', 'delta', 'epsilon', 'zeta', 'eta', 'theta', 'iota', 'kappa'];

for (const obj of data.objects) {
    let groupMemmbers = [];
    obj.ranges.forEach((value, index) => {
        const rangeName = rangeNames[index];
        const resName = `${obj.name}-${rangeName}`;
        groupMemmbers.push(resName);
        const hostResource = `
        resource "checkpoint_management_host" "${resName}" {
            name = "${resName}"
            ipv4_address = "${value}"
            comments = "name: ${obj.name}"
            tags = ["group_${obj.name}", "Made with Terraform"]
    
            ignore_warnings = true # e.g. obj with same IP address already exists
        }        
        `
        console.log(hostResource);

    });
    const groupResource = `
    resource "checkpoint_management_group" "${obj.name}" {
        name = "${obj.name}"
        members = [ ${groupMemmbers.map((x) => `checkpoint_management_host.${x}`).join(", ")} ]
    }
    `
    console.log(groupResource);
}