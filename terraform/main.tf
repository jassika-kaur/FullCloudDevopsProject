provider "aws" {
  region = var.aws_region
}

# ─── Security Group ───────────────────────────────────────────────
# This is like a firewall — controls which ports are open
resource "aws_security_group" "mern_sg" {
  name        = "mern-cicd-sg"
  description = "Allow SSH, HTTP, Jenkins, NodePort"

  # SSH — to connect to server
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Jenkins UI — to open Jenkins in browser
  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # React frontend
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Express backend
  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # MongoDB
  ingress {
    from_port   = 27017
    to_port     = 27017
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Prometheus
  ingress {
    from_port   = 9090
    to_port     = 9090
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Grafana
  ingress {
    from_port   = 3001
    to_port     = 3001
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow all outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "mern-cicd-sg"
  }
}

# ─── EC2 Instance ─────────────────────────────────────────────────
# This is your actual server on AWS
resource "aws_instance" "mern_server" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.mern_sg.id]

  # 20GB disk space
  root_block_device {
    volume_size = 20
    volume_type = "gp2"
  }

  # This script runs automatically when EC2 starts
  # It installs Java, Jenkins, Docker, kubectl, minikube
  user_data = file("${path.module}/userdata.sh")

  tags = {
    Name = "mern-cicd-server"
  }
}

# ─── Elastic IP ───────────────────────────────────────────────────
# Makes sure your server IP stays the same even after restart
resource "aws_eip" "mern_eip" {
  instance = aws_instance.mern_server.id
  domain   = "vpc"

  tags = {
    Name = "mern-cicd-eip"
  }
}
