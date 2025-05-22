terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = ">= 6.0.0, < 7.0.0"
    }
    kubernetes = {
      source = "hashicorp/kubernetes"
        version = "2.37.0"
    }
  }
  required_version = ">= 0.13"
}