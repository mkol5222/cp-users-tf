terraform {
  required_providers {
    checkpoint = {
      source  = "CheckPointSW/checkpoint"
      version = "2.5.1"
    }
  }
}
provider "checkpoint" {
  server        = var.CPSERVER
  api_key       = var.CPKEY
  context       = "web_api"
  cloud_mgmt_id = var.CPID
  timeout = 30
  session_description = "Terraform session descr."
  session_name = "Terraform session"
}

variable "CPSERVER" {
  
}
variable "CPKEY" {
  
}
variable "CPID" {
  
}

