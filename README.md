
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

# other way to publish
curl -OL https://github.com/mkol5222/cp-mgmt-commands/raw/master/releases/x86_64/publish
chmod +x ./publish

export CHECKPOINT_SERVER=$TF_VAR_CPSERVER
export CHECKPOINT_CLOUD_MGMT_ID=$TF_VAR_CPID
export CHECKPOINT_API_KEY=$TF_VAR_CPKEY
./publish
```
