## Demo for Konnect Mockup

Schema Design Philosophy

Service Table
id: int auto inc
title: varchar(50) unique not null
description: varchar(100), default empty string
createDate: Datetime
updateDate: Datetime

Version Table
id: int auto inc
version_number: varchar(50) unique not null
createDate: Datetime
foreignId: service.id

Service table contains columns for storing basic information, such as title and description, based on 
UX design. On top of that, unique ID is to assigned to each service entity to uniquely identify 
each service object for future modification of service entity. There are column for storing the initial 
creation date of the service entity and a column for keep track of the latest modifying date. 

Version table is a separate table because it allows us to keep track of version history of a service entity. Users has the ability to update arbitrary version number as the new version number. This way, it's on  users to follow their version update guideline or some checks could be implemented in the backend to guard any malicious version update. The foreign id of a version is a reference to the service entity. When users updated the version on the frontend, the version table inserts a new record instead of modifying the existing record, this way enables us to see a list of versions of a service entity.  
A drawback for this design is when two users try to update on the same version, it creates a divergence on the version history if they decide to assign different new version number. Potential solutions are 
1. add a new column prev_version for storing the previous version number for diverging.
2. lock the table/backend/frontend when someone if trying to modify the version to disallow version divergence


Controller Design Philosophy

App Structure Design Philosophy
