
```bash
# generate COUNT fake accounts to CSV file example.csv
deno run --allow-write fakeusers.ts

# update TF file
deno run --allow-read gentf.ts | tee users.tf
deno run --allow-read gengr.ts | tee groups.tf

# make sure TF_VAR_CPSERVER, TF_VAR_CPID, TF_VAR_CPKEY exist:
# consider repo Codespace secrets
env | grep TF_VAR_CP

# apply
terraform init
terraform apply -var publish=false
# publish
terraform apply -var publish=true
```
