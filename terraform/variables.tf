variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "ami_id" {
  description = "Ubuntu 22.04 LTS AMI — us-east-1"
  type        = string
  default     = "ami-00403f401ee6a4b98"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t3.micro"   # Good for Jenkins + Docker + Kubernetes
}

variable "key_name" {
  description = "Your AWS key pair name (without .pem)"
  type        = string
  default     = "terraform-key"   # ← CHANGE THIS to your .pem file name
}
