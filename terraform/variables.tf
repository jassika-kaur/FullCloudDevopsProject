variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "ami_id" {
  description = "Ubuntu 22.04 LTS AMI — us-east-1"
  type        = string
  default     = "ami-0c7217cdde317cfec"
}

variable "instance_type" {
  description = "EC2 instance type"
  type        = string
  default     = "t2.medium"   # Good for Jenkins + Docker + Kubernetes
}

variable "key_name" {
  description = "Your AWS key pair name (without .pem)"
  type        = string
  default     = "terraform-key"   # ← CHANGE THIS to your .pem file name
}
