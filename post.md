# **_Taming your Redux Application_**

Due to the large amount of boilerplate, it is very easy for a Redux app to turn into a tangled mess. I've developed a number of applications with Redux and I've learned a few valuable lessons along the way I'd like to share.

While you might think that Redux is dead because of the new React Hooks feature, Redux can still be a powerful tool to have for building more complex applications.

# Lesson One: Actions are Events

## The Problem

The first problem I encountered when working on my Redux applications was defining actions.

The root of this problem comes from a slight mistake I think the developers of Redux made when defining the language of their framework. The term `Actions` is often misleading and confusing. Users are the ones that are taking actions, and your display logic should handle that. TODO: flesh out with the examples.

TODO: example of bad action pattern (see federationrepo)

The solution is a bit radical. You need to completely change your definition of an action. In fact, it's better to stop using the term Actions and instead refer to them as `Events`.

But this doesn't mean we are getting rid of Actions completely. Instead of only creating actions when we need to update state, we create `Actions` when we need to implement the logic for handling user interactions. This means that Actions have a direct binding to the UI.

When Actions are run, they dispatch Events (a.k.a. traditional Redux Actions).

TODO: Insert image of the Redux state/store data flow.

This is all great, but when I first saw [the Redux state/store data flow] I didn't fully understand how this ties into my application code. When we put Events between our Actions and our Reducers, the flow looks a bit more like this:

```
User ---(interacts with)----> UI ----(calls)---> Actions ---(dispatch)---> Events ---(handled by)---> Reducers --(mutate)--> state --(updates)---> UI

TODO: this should be an infographic
```

For me, this flow makes it a bit easier to see where I'm adding code to my application and how data gets moved around inside it.

That's not all though. With this state management architecture, it becomes much easier to reason about how you can implement display logic. This has a direct impact on UX. Let me explain:
You've probably been given a sketch/figma/Adobe XD document before that outlines some sort of user story/funnel/channel. It includes a component that has some initial state, and then arrows that indicate how the component looks after various user interactions.
Because these different possible states for a component are often sequential, we need to make our new Actions asynchronous. To make this possible, I use `redux-thunk` along with async/await to write extremely easy to read code for our actions (which helps a lot when you have to maintain a large application).

## An Example App

To fully explain what I'm getting at here, let's use the example of a calculator app.

I encourage you to build this along with me, tinker around with it, and gain a more complete understanding of this paradigm shift.

## Getting Setup

I want to start by getting a basic calculator app up and running before we get into a full discussion. I think it's worth the time here so that we can get a feel for this pattern in a more lifelike scenario. Applications are complex in the real world, and Redux is a tool specifically designed to manage that complexity. Therefore, toy examples don't quite do Redux justice.

First, lets get some boilerplate:

```sh
npx create-react-app calculator
cd calculator
npm i redux redux-thunk
```

Next, add some folders to organize the code in the `src` folder:

![Boilerplate Architecture](https://i.imgur.com/31oT9Yv.png)
TODO: UPDATE THIS AS IT CHANGES

## CONTENT NOTES

## Error and Loading Events

One of the neat benefits of this state management architecture is more streamlined error handling. Because our actions can potentially dispatch multiple actions (not necessarily simultaneously), if an action produces an error it can dispatch an `ERROR` event that updates the application state accordingly.

The pattern is fairly similar for changing the loading state. As previously mentioned, we are often given designs that outline a very specific set of possible states for a component. We can use a single type of `LOADING` event that we dispatch to our state and attach data about _what_ is loading in the Event's payload.
We can easily specify the async
