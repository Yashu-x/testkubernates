variable "project_id" {
  description = "The project ID to host the cluster in"
  default     = "acc ekk nathoooo"
}
variable "cluster_name" {
  description = "The name for the GKE cluster"
  default     = "loginpage-Cluster"
}
variable "env_name" {
  description = "The environment for the GKE cluster"
  default     = "prod"
}
variable "region" {
  description = "The region to host the cluster in"
  default     = "us-west1"
}
variable "kubernetes_version" {
  description = "The Kubernetes version of the masters"
  default     = "latest"
}
variable "network" {
  description = "The VPC network created to host the cluster in"
  default     = "gke-network"
}
variable "subnetwork" {
  description = "The subnetwork created to host the cluster in"
  default     = "gke-subnet"
}
variable "ip_range_pods_name" {
  description = "The secondary ip range to use for pods"
  default     = "ip-range-pods"
}
variable "ip_range_services_name" {
  description = "The secondary ip range to use for services"
  default     = "ip-range-services"
}