pipeline {
    agent any

    environment {
        DOCKER_IMAGE_BACKEND = 'mern-ecommerce-backend'
        DOCKER_IMAGE_FRONTEND = 'mern-ecommerce-frontend'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend Image') {
            steps {
                dir('backend') {
                    sh 'docker build -t ${DOCKER_IMAGE_BACKEND} .'
                }
            }
        }

        stage('Build Frontend Image') {
            steps {
                dir('frontend') {
                    sh 'docker build -t ${DOCKER_IMAGE_FRONTEND} .'
                }
            }
        }

        stage('Deploy (Docker Compose)') {
            steps {
                sh 'docker-compose down'
                sh 'docker-compose up -d'
            }
        }
    }
}
