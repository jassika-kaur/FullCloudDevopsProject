# After terraform apply — these values will be printed on your screen

output "instance_public_ip" {
  description = "Your EC2 server public IP"
  value       = aws_eip.mern_eip.public_ip
}

output "jenkins_url" {
  description = "Open this in browser to access Jenkins"
  value       = "http://${aws_eip.mern_eip.public_ip}:8080"
}

output "frontend_url" {
  description = "Open this in browser to see your React app"
  value       = "http://${aws_eip.mern_eip.public_ip}:3000"
}

output "backend_url" {
  description = "Your Express API URL"
  value       = "http://${aws_eip.mern_eip.public_ip}:5000"
}

output "ssh_command" {
  description = "Run this command to connect to your server"
  value       = "ssh -i terraform-key.pem ubuntu@${aws_eip.mern_eip.public_ip}"
}
