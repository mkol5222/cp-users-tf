
import { readCSVObjects } from "https://deno.land/x/csv/mod.ts";

const f = await Deno.open("./example.csv",);
for await (const obj of readCSVObjects(f)) {
    //console.log(obj);

    const resource = `
    resource "checkpoint_management_host" "${obj.loginName}" {
        name = "ra_user_${obj.loginName}"
        ipv4_address = "${obj.ipAddress}"
        comments = "name: ${obj.name}"
        tags = ["group_${obj.group}", "Made with Terraform"]
        # groups = ["${obj.group}"]

        ignore_warnings = true # e.g. obj with same IP address already exists
    }
    `
    console.log(resource);
  }
