

### API

##  POST request
*  passes data as stringified JSON in the body of a **POST** request to create a new resource
* responses to bad requests with "bad request", "missing title", "missing content"

## GET request
* passes `?id=<uuid>` as a query string parameter to retrieve a specific resource (as JSON)
* (bonus) returns an array of all the notes and ids for that resource

## DELETE request
* deletes a note with the provided id, responses with 204

## PATCH
* replaces the title and the contend for a note with the passed id.
* responses with the 200 status and a note with new title and content.

## tests
* all done and running using Mocha.  
