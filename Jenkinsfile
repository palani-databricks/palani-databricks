def label = "worker-2${UUID.randomUUID().toString()}"

podTemplate(label: label, containers: [
        containerTemplate(name: 'nodejs', image: 'node:13.3.0', ttyEnabled: true, command: 'cat'),
        containerTemplate(name: 'docker', image: 'docker:1.12.6', command: 'cat', ttyEnabled: true),
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
	  image_tag = "${scmInfo.GIT_BRANCH}-${scmInfo.GIT_COMMIT[0..7]}"
	  image_name = "frontend-app"
	  
	  stage('NPM Install') {
	    container ('nodejs') {
	         
                 sh 'npm install'
		   
	    }
       }
  }
}
