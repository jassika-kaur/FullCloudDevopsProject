#!/bin/bash
# ================================================================
# WHAT IS THIS FILE?
# This script runs AUTOMATICALLY when your EC2 server starts
# for the very first time. It installs everything we need.
# You don't need to run this manually — Terraform handles it!
# ================================================================

# Stop script if any command fails
set -e

# Save all output to a log file (so we can debug if something fails)
exec > /var/log/userdata.log 2>&1

echo "================================================"
echo " EC2 Server Setup Started..."
echo "================================================"

# ── STEP 1: Update the server ────────────────────────────────────
# Like Windows Update — gets latest security patches
echo ">>> Step 1: Updating server..."
apt-get update -y
apt-get upgrade -y
echo ">>> Server updated!"

# ── STEP 2: Install Java 17 ──────────────────────────────────────
# Jenkins NEEDS Java to run — without this Jenkins won't start
echo ">>> Step 2: Installing Java 17..."
apt-get install -y openjdk-17-jdk
java -version
echo ">>> Java installed!"

# ── STEP 3: Install Jenkins ──────────────────────────────────────
# Jenkins is our CI/CD tool — it runs our pipeline automatically
echo ">>> Step 3: Installing Jenkins..."

# Add Jenkins repository (so apt knows where to download Jenkins from)
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/" | tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

apt-get update -y
apt-get install -y jenkins

# Make Jenkins start automatically even after server reboot
systemctl enable jenkins
systemctl start jenkins
echo ">>> Jenkins installed and running!"

# ── STEP 4: Install Docker ───────────────────────────────────────
# Docker packages our app into containers
echo ">>> Step 4: Installing Docker..."

apt-get install -y ca-certificates curl gnupg lsb-release
mkdir -p /etc/apt/keyrings

# Add Docker repository
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
  gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo "deb [arch=$(dpkg --print-architecture) \
  signed-by=/etc/apt/keyrings/docker.gpg] \
  https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | tee \
  /etc/apt/sources.list.d/docker.list > /dev/null

apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io

# Allow jenkins user to run Docker commands (very important!)
usermod -aG docker jenkins

# Allow ubuntu user to run Docker commands
usermod -aG docker ubuntu

# Start Docker automatically on reboot
systemctl enable docker
systemctl start docker
echo ">>> Docker installed!"

# ── STEP 5: Install kubectl ──────────────────────────────────────
# kubectl is the command line tool to control Kubernetes
echo ">>> Step 5: Installing kubectl..."

curl -LO "https://dl.k8s.io/release/$(curl -L -s \
  https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"

install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
rm kubectl
kubectl version --client
echo ">>> kubectl installed!"

# ── STEP 6: Install Minikube ─────────────────────────────────────
# Minikube runs Kubernetes on a single server (perfect for learning)
echo ">>> Step 6: Installing Minikube..."

curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
install minikube-linux-amd64 /usr/local/bin/minikube
rm minikube-linux-amd64
echo ">>> Minikube installed!"

# ── STEP 7: Install Git ──────────────────────────────────────────
# Git is needed so Jenkins can clone your GitHub repo
echo ">>> Step 7: Installing Git..."
apt-get install -y git
echo ">>> Git installed!"

# ── STEP 8: Start Minikube ───────────────────────────────────────
# Start Kubernetes cluster using Docker as the driver
echo ">>> Step 8: Starting Minikube..."
sudo -u ubuntu minikube start --driver=docker --force || true
echo ">>> Minikube started!"

# ── STEP 9: Install Node Exporter (for Prometheus monitoring) ────
# Node Exporter collects server metrics so Prometheus can read them
echo ">>> Step 9: Installing Node Exporter..."

useradd --no-create-home --shell /bin/false node_exporter || true

wget https://github.com/prometheus/node_exporter/releases/download/v1.7.0/node_exporter-1.7.0.linux-amd64.tar.gz
tar xvf node_exporter-1.7.0.linux-amd64.tar.gz
cp node_exporter-1.7.0.linux-amd64/node_exporter /usr/local/bin/
rm -rf node_exporter-1.7.0.linux-amd64*

# Create a service so Node Exporter runs automatically
cat <<EOF > /etc/systemd/system/node_exporter.service
[Unit]
Description=Node Exporter
After=network.target

[Service]
User=node_exporter
ExecStart=/usr/local/bin/node_exporter

[Install]
WantedBy=default.target
EOF

systemctl daemon-reload
systemctl enable node_exporter
systemctl start node_exporter
echo ">>> Node Exporter installed!"

echo "================================================"
echo " ALL DONE! Server is ready!"
echo ""
echo " To get Jenkins password, run:"
echo " sudo cat /var/lib/jenkins/secrets/initialAdminPassword"
echo "================================================"
