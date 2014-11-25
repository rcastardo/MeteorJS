// simple-todos.js
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {
    // This code only runs on the client
    Template.body.helpers({
        tasks: function () {
            /*
             Currently, our code displays all new tasks at the bottom of the list. That's not very good for a task list, because we want to be see the newest tasks first.

             We can solve this by sorting the results using the createdAt field that is automatically added by our new code. Just add a sort option to the find call inside the tasks helper:
             */
            return Tasks.find({}, {sort: {createdAt: -1}});
        }
    });

    // Inside the if (Meteor.isClient) block, right after Template.body.helpers:
    Template.body.events({
        "submit .new-task": function (event) {
            // This function is called when the new task form is submitted

            var text = event.target.text.value;

            Tasks.insert({
                text: text,
                createdAt: new Date() // current time
            });

            // Clear form
            event.target.text.value = "";

            // Prevent default form submit
            return false;
        }
    });

    // In the client code, below everything else
    Template.task.events({
        "click .toggle-checked": function () {
            // Set the checked property to the opposite of its current value
            Tasks.update(this._id, {$set: {checked: ! this.checked}});
        },
        "click .delete": function () {
            Tasks.remove(this._id);
        }
    });
}