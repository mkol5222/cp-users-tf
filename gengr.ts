import { readCSVObjects } from "https://deno.land/x/csv/mod.ts";

const f = await Deno.open("./example.csv",);

const groups = {};
for await (const obj of readCSVObjects(f)) {
    //console.log(obj);
    const group = obj.group;
    const objName = `${obj.loginName}`
    
    if (obj["group"] in groups) {
        groups[obj["group"]].push(objName);
    } else {
        groups[obj["group"]] = [objName];
    }
}

// console.log(groups);
// console.log(Object.keys(groups));

for (const gr of Object.keys(groups)) {
    // console.log(gr);

    const dependsOn = groups[gr].map((x) => `checkpoint_management_host.${x}`);

    const resource = `
    resource "checkpoint_management_group" "${gr}" {
        name = "gr_${gr}"
        members = ${JSON.stringify(groups[gr].map((x) => `ra_user_${x}`))}

        depends_on = [ ${dependsOn.join(", ")} ]
    }
    `
    console.log(resource);
  
}

// # Example:
// # resource "checkpoint_management_group" "example" {
// #   name = "New Group 4"
// #   members = ["New Host 1", "My Test Host 3"]
// #
