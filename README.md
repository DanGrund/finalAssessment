# Garage Bin

"I'll get to trying this out some day, maybe." — Jeff Casimir

"Finally, a place where I can keep track of my fantastical spirit animals!" — Louisa Barrett

"This app is for me. I use it every day. It's critical to my workflow." — Jhun de Andres

## Your Mission

The only way to truly understand any front-end framework is to build a to-do list—an Idea Box, if you will. But we're not going to build just any to-do list, we're going to build a list that keeps track of all the mysterious items that linger in our garages for all time.

## Rules

You may not have any commits in the repo from before 9:15am (i.e. you can reference a starter kit but the code in the repo must be your own)

You may not solicit questions on the specific code from cohort-mates, mentors, etc. You may not pair with anyone on this assignment. Instructors will answer questions at their discretion (i.e. feel free to ask us, we probably won’t answer but if you’re really in the weeds on something crazy we will).

Last commit must be in before 7:15 p.m. Exceptions for job/life events should be documented in the submission. You may add that time on to the 7:15 deadline. i.e. code interview at 2:00pm - took 30 minutes to prep - code interview was an hour long - added 1 hour and 30 mins to 7:15 deadline.

Application must be deployed prior to Friday a.m. eval.

### The Technologies

You're welcome to choose whatever other technologies you want. That said, I'd read the requirements carefully before you make a technology decision. You will also need some way to persist items between sessions. If the user closes the tab and reopens it, they should still see all of the garage items that continue to linger.

### The Model

The model will need the following:

- An `id` (Integer)
- The name of the item that lingers (String)
- The reason that the item continues to linger (String)
- The cleanliness of the item (can be one of the three following values): Sparkling, Dusty, Rancid (String)

### Persistance
At a minimum, all item data should be persisted in app.locals on a Node/Express server.

### The Features

- MAJOR: Users should be able to open and close a garage door to see or not see the list of items.
  - MINOR: By default, the garage door is closed and the list is not visible.
  - MINOR: When opened (by button or any click event you choose), the garadge door should transition up and after a few seconds, the list of items should be fully visible and the garage door is gone.
- MAJOR: Users should be able to add a new item to the list. When a new item is added, it should be posted to the server with a POST request.
  - MINOR: They should be able to include the name of the item.
  - MINOR: They should be able to include the reason why that item lingers.
  - MINOR: They should be able to select the cleanliness of the item in a dropdown.
- The list should show the following data:
  - MAJOR: The names of the items in the garage.
  - MAJOR: A count of the total number of items in the garage.
  - MAJOR: A count of the number of items per each value of cleanliness (i.e. 5 items are sparkling, 2 are dusty, 3 are rancid).
- MAJOR: The list can sort items by the items's name.
- MAJOR: User should be able to navigate to a particular item by clicking it's name on the list. On this page, the user should see the following:
  - MINOR: The name of the particular garage item.
  - MINOR: The reason it lingers.
  - MINOR: A dropdown or other option to change the cleanliness of the item. When the cleanliness is changed, the change should be sent to the server with a PUT or PATCH request.

### The Extensions

#### Style

Can you display the garage items in a way, using color and style, that dynamically organize items by cleanliness?

Get weird with it.

#### True Persistence

The Node server can be shut down and all of the data is not lost. This would involve storing the data in a database.

## Rubric

In order to pass the assessment, students must achieve a 3 or above on all rubric points.

### Specification Adherence

* 4: The application consists of one page with all of the major and minor functionality being provided. No approach was taken that is counter to the spirit of the project and its learning goals. There are no features missing from above that make the application feel incomplete or hard to use. Application is in production and at least one extension is completed.
* 3: The application is in a usable state, but is missing 1 major feature or 1-2 minor features outlined in the specification above. Application is in production.
* 2: The application is missing 3 or more minor features or 2+ major feature essential to having a complete application. Application is in production but not working.
* 1 points: The application is unusable and not in production.

### Javascript Syntax & Style

* 4: Developer uses elegant and idiomatic Javascript with vast majority of function 5 lines or shorter. Demonstrates solid understanding of single responsibility principle. Developer can speak to choices made in the code and knows what every line of code is doing.
* 3: Developer writes solid Javascript code using common patterns and idioms. Code is organized appropriately within objects and functions. Developer can speak to choices made in the code and knows what every line of code is doing.
* 2: Developer can accomplish basic tasks with Javascript but implementation is largely copy/pasted or non-idiomatic. Developer is not confident in what every line of the code is doing or cannot speak to the choices made.
* 1: Developer can manipulate Javascript syntax but implementation is buggy or inconsistent.

### Testing

* 4: Developer excels at taking small steps and using the tests for *both* design and verification. Developer uses integration tests and unit tests extensively across the entire application.
* 3: Developer writes tests that are effective validation of functionality, but don't drive the design. Developer uses integration tests and a few unit tests where appropriate.
* 2: Developer uses tests to guide development, but implements more functionality than the tests cover. Application is missing tests at the integration and unit level that cover major functionality.
* 1: Developer is able to write tests, but they're written after or in the middle of implementation.

### CSS Style

*CSS is graded on quality, not quantity. You don't need a lot of CSS to have a pleasant interface*

* 4: Application has exceptionally well-factored CSS with little or no duplication and all styles separated out into logical stylesheets. There are zero instances where an instructor would recommend taking a different approach.
* 3:  Application is thoughtfully put together with some duplication and no major bugs. Developer can speak to choices made in the code and knows what every line of CSS is doing.
* 2:  Your application has some duplication and minor bugs. Developer can speak to most choices made in the code and knows what every line is doing.
* 1:  Your application has a significant amount of duplication and one or more major bugs. Developer cannot speak to most choices and does not know what every line of CSS is doing. Developer writes code with unnecessary selectors or tags which do not increase clarity.

### User Interface

* 4: The application is pleasant, logical, and easy to use. The interface is aesthetically pleasing to the evaluator. There is good use color and whitespace. There is no point where the instructor cannot figure out how to use the application without guidance from the developer.
* 3: The application has many strong pages/interactions, but a few holes in lesser-used functionality
* 2: The application shows effort in the interface, but the result is not effective
* 1: The application is confusing or difficult to use

### Workflow

* 4: The developer effectively uses Git branches and many small, atomic commits that document the evolution of their application.
* 3: The developer makes a series of small, atomic commits that document the evolution of their application. There are no formatting issues in the code base.
* 2: The developer makes large commits covering multiple features that make it difficult for the evaluator to determine the evolution of the application.
* 1: The developer commited the code to version control in only a few commits. The evaluator cannot determine the evolution of the application.
