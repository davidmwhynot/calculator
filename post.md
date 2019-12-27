# **_Taming your Redux Application_**

Due to the large amount of boilerplate, it is very easy for a Redux app to turn into a tangled mess. I've developed a number of applications with Redux and I've learned a few valuable lessons along the way I'd like to share.

While you might think that Redux is dead because of the new React Hooks feature, Redux can still be a powerful tool to have for building more complex applications.

# Lesson One: Actions are Events

## The Problem

The first problem I encountered when working on my Redux applications was defining actions.

The root of this problem comes from a slight mistake I think the developers of Redux made when defining the language of their framework. The term `Actions` is often misleading and confusing. Users are the ones that are taking actions, and your display logic should handle that. TODO: flesh out with the examples.

TODO: example of bad action pattern (see federationrepo)

The solution is a bit radical. You need to completely change your definition of an action. In fact, it's better to stop using the term Actions and instead refer to them as `Events`.

But this doesn't mean we are getting rid of Actions completely. Instead, our `Actions` are defined by the user, not by what modifies the state. Actions have a direct binding to the UI. When Actions are run, they dispatch Events.

TODO: Insert image of the Redux state/store data flow.

This is all great, but when I first saw it I didn't fully understand how I wrestle this paradigm into my code. When we put Events between our Actions and our Reducers, the flow looks a bit more like this:

```
User ---(interacts with)----> UI ----(calls)---> Actions ---(dispatch)---> Events ---(handled by)---> Reducers --(mutate)--> state --(updates)---> UI

TODO: this should be an infographic
```

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

First, lets take a look at the architecture of our app:

![Boilerplate Architecture](https://i.imgur.com/31oT9Yv.png)
TODO: UPDATE THIS AS IT CHANGES
