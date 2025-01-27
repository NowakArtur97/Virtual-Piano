# Virtual-Piano

## Table of Contents

- [General info](#general-info)
- [Features](#features)
- [Built With](#built-with)
- [Status](#status)

## General info

AWS CloudFormation template for creating resources for a static website on an S3 bucket with a virtual piano app.

## Features

Virtual Piano:

- Playing the piano with a mouse and keyboard
- Recording a song
- Playing the recording
- Playing a recorded song sound by sound
- Clearing the recording
- Playing a sample song

CloudFormation:

- Automatic copying of website files from the GitHub repository to the S3 bucket
- Automatic cleaning of the S3 bucket after deleting a CloudFormation template
- Collecting logs from the lambda functions

## Built With

CloudFormation resources:

- S3 Bucket
- Bucket Policy
- IAM Roles
- Lambda Functions
- CloudFormation Custom Resources

## Status

Project is: finished
