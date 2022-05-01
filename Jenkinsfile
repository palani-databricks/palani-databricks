def label = "worker-2${UUID.randomUUID().toString()}"

podTemplate(label: label, containers: [
        containerTemplate(name: 'nodejs', image: 'node:13.3.0', ttyEnabled: true, command: 'cat'),
        containerTemplate(name: 'docker', image: 'docker', command: 'cat', ttyEnabled: true),
	containerTemplate(name: 'kubectl', image: 'lachlanevenson/k8s-kubectl:latest', command: 'cat', ttyEnabled: true)
    
        
],
volumes: [
   hostPathVolume(mountPath: '/var/run/docker.sock', hostPath: '/var/run/docker.sock'),
  hostPathVolume(hostPath: '/root/.m2/repository', mountPath: '/root/.m2/repository')
]) {
  node(label) {
    def scmInfo = checkout scm
    def image_tag
      def image_name
      sh 'pwd'
      def gitCommit = scmInfo.GIT_COMMIT
      def gitBranch = scmInfo.GIT_BRANCH
      def commitId
      commitId= scmInfo.GIT_COMMIT[0..7]
	  image_tag = "latest"
	  image_name = "node-app"
	  
	  stage('NPM Install') {
	    container ('nodejs') {
	         sh 'npm install'   
	    }
       }
	  
	  stage('Build Docker Image') {
	    container ('docker') {
		    sh "docker build -t ${image_name}:${image_tag} ."
	    }
       }
	  
	
	   stage('Docker Login') {
	    container ('docker') {
		    withCredentials([string(credentialsId: 'dockerhub_user_pass', variable: 'dockerhub_user_pass')]) {
			    sh """ docker login -u palanidatabricks -p ${dockerhub_user_pass}
         }
		    
	    }
       }
       
       tage('Docker Image Push') {
	    container ('docker') {
        docker push https://index.docker.io/v1/${image_name}:${image_tag}  """
		    }
	    }
	  
  }
}
