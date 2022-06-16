## Demo for Konnect Mockup

**Schema Design Philosophy**

Service Table <br />
id: int auto inc <br />
title: varchar(50) unique not null <br />
description: varchar(100), default empty string <br />
createDate: Datetime <br />
updateDate: Datetime <br />

Version Table <br />
id: int auto inc <br />
version_number: varchar(50) unique not null <br />
createDate: Datetime <br />
foreignId: service.id <br />

Service table contains columns for storing basic information, such as title and description, based on 
UX design. On top of that, unique ID is to assigned to each service entity to uniquely identify 
each service object for future modification of service entity. There are column for storing the initial 
creation date of the service entity and a column for keeping track of the latest updated date. 

Version table is a separate table because it allows us to keep track of version history of a service entity. Users has the ability to update arbitrary version number as the new version number. This way, it's on users to follow their versioning policy. Some checks could be implemented in the backend to guard any malicious version update. The foreign id of in version table is a reference to the service entity. When users update the version on frontend, the version table inserts a new record instead of modifying the existing record, this way enables us to see a list of versions of a service entity.  
A drawback for this design is when two users try to update from the same version, it creates a divergence on the version history if they decide to assign different some new version numbers. Potential solutions are 
1. add a new column prev_version for storing the previous version number for tracking diverging.
2. lock the table/backend/frontend when someone if trying to modify the version to disallow concurrent modification.


**Controller Design Philosophy**

APIs are designed in a way to be as flexible as possible for maximum code reusability. API documentation is needed to guide API consumers. Http status codes should be used to specify return status but due to time limitation, it's not fully implemented yet. 

``Get: /services`` -> gets a lists of all available services. Query parameter 'like' enables text-based match to search for some services. Query param 'sortBy' enables users to sort the result by updateDate, createDate or id in either ascending or descending order based on 'order' param. Params 'limit' and 'offset' enables pagination. The return data includes a count of past version.

``Get /services/:id`` -> gets a specific service by path parameter Id. The return data will includes a list of past versions with their creationDates.

``Post /services`` -> creates a new service. Title field is mandatory during creation. Description is optional with default empty string. Newly created entity id is returned

``Put /services/:id`` -> updates a specific service's title, description or version number. On the surface level, version number is considered as a field of a service entity. 

``Delete /services/:id`` -> deletes a specific service and cascade the deletion of its version. Frontend should prompt the user for deletion confirmation as this action is irreversible. 


**App Structure Design Philosophy**

As this is only for demo purposes, I kept the the project structure relatively simple with entities bundled right into the AppService and AppController. However my general design philosophy is structure things as neat as possible but I always like to the keep the complexity to a certain level. Once the app grows too complex, it's time to split the app into multiple services in order to maintain the complexity in a manageable fashion. 
