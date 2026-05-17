pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = "jassika"
        BACKEND_IMAGE      = "${DOCKERHUB_USERNAME}/mern-backend"
        FRONTEND_IMAGE     = "${DOCKERHUB_USERNAME}/mern-frontend"
        DOCKERHUB_CREDS    = "dockerhub-credentials"
    }

    stages {

        stage('Clone Repository') {
            steps {
                echo 'Cloning latest code from GitHub...'
                checkout scm
                echo 'Code cloned successfully!'
            }
        }

        stage('Build Docker Images') {
            steps {
                echo 'Building Docker images...'
                sh "docker build -t ${BACKEND_IMAGE}:latest ./backend"
                sh "docker build -t ${FRONTEND_IMAGE}:latest ./frontend"
                echo 'Docker images built successfully!'
            }
        }

        stage('Push to DockerHub') {
            steps {
                echo 'Pushing images to DockerHub...'
                withCredentials([usernamePassword(
                    credentialsId: DOCKERHUB_CREDS,
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin"
                    sh "docker push ${BACKEND_IMAGE}:latest"
                    sh "docker push ${FRONTEND_IMAGE}:latest"
                }
                echo 'Images pushed to DockerHub!'
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                echo 'Deploying to Kubernetes...'
                sh "kubectl apply -f k8s/mongo-deployment.yaml"
                sh "kubectl apply -f k8s/backend-deployment.yaml"
                sh "kubectl apply -f k8s/frontend-deployment.yaml"
                sh "kubectl rollout status deployment/backend-deployment"
                sh "kubectl rollout status deployment/frontend-deployment"
                echo 'Deployed to Kubernetes successfully!'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed! Check the logs above.'
        }
    }
}