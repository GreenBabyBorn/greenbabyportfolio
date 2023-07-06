pipeline {
    agent any
    options {
        skipStagesAfterUnstable()
    }
    stages {
        stage('Deploy to server') {
            steps {
                sshagent(['ssh-greenbabyborn-green']) {
                    sh 'rsync -e "ssh -o StrictHostKeyChecking=no" -avz . "green@greenbabyborn.ru:~/greenbabyportfolio"'
                }
            }
        }
        stage('Build frontend') {
            steps {
                sshagent(['ssh-greenbabyborn-green']) {
                    sh '''ssh -o StrictHostKeyChecking=no green@greenbabyborn.ru &
                    cd ~/greenbabyportfolio/frontend &
                    npm run build &
                    pm2 reload greenbabyborn &
               '''
                }
            }
        }
        stage('Build backend') {
            steps {
                sshagent(['ssh-greenbabyborn-green']) {
                    sh '''ssh -o StrictHostKeyChecking=no green@greenbabyborn.ru &
                    cd ~/greenbabyportfolio/backend &
                    npm run build &
                    pm2 reload greenbabyapi &
               '''
                }
            }
        }
    }
}
