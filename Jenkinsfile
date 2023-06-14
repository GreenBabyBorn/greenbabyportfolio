pipeline {
    agent any
    options {
        skipStagesAfterUnstable()
    }
    stages {
        stage('Test') {
            steps {
<<<<<<< HEAD
               echo '4 test ci/cd'
=======
                sshPublisher(publishers: [sshPublisherDesc(configName: 'greenbabyserver', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: 'echo \'Privetik\'', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '.')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])sshPublisher(publishers: [sshPublisherDesc(configName: 'greenbabyserver', transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: 'echo \'Privetik\'', execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '', remoteDirectorySDF: false, removePrefix: '', sourceFiles: '.')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
                echo 'dev test ci/cd'
>>>>>>> dev
            }
        }
    }
}
