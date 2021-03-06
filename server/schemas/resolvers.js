const { AuthenticationError } = require("apollo-server-express");
const { User, Snippet } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query : {
        me: async (parent, args, context) => {
            if(context.user){
                return User.findOne({_id: context.user._id}).populate("codeSnippets")
            }
            throw new AuthenticationError("You must be logged in to view this!");
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate("codeSnippets");
        },
        snippets: async (parent, args, context) => {
            return Snippet.find().populate("userId")
        },
        snippetById: async (parent, args) => {
            return Snippet.findById(args._id).populate("userId").populate("comments")
        },
    },
    Mutation: {
        login: async (parent, {email, password}) => {
            const user = await User.findOne({email});

            if(!user){
                throw new AuthenticationError("Username or password is incorrect.");
            }

            const correctPw = await user.validatePassword(password);

            if(!correctPw){
                throw new AuthenticationError("Username or password is incorrect.");
            }

            const token = signToken(user);
            return {token, user};
        },
        addUser: async(parent, {email, username, password}) => {
            if(!email || !username || !password){
                throw new AuthenticationError("Insufficient details provided to create a user!")
            }
            const newUser = await User.create({username, email, password});
            const token = signToken(newUser);
            return {token, user: newUser}
        },
        saveSnippet: async(parent, {input}, context) => {
            if(context.user){
                const userId = context.user._id
                const updatedInput = {...input, userId}
                const snippet = await Snippet.create({...updatedInput})

                const updatedUser = await User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$addToSet: {codeSnippets: snippet._id}},
                    {new: true, runValidators: true}
                ).populate("codeSnippets")
                return updatedUser;
            }
            throw new AuthenticationError("You are not logged in!")
        },
        removeSnippet: async(parent, {_id} , context) => {
            if(context.user) {
                await Snippet.findByIdAndDelete(
                    {_id}
                )
                
                const user = User.findOneAndUpdate(
                    {_id: context.user._id},
                    {$pull: {codeSnippets: {_id}}},
                    {new: true}
                ).populate("codeSnippets")

                return user 
            }

            throw new AuthenticationError("You are not logged in.")

        },
        updateSnippet: async(parent, {input}, context) => {
            if(context.user){
                const snippet = await Snippet.findByIdAndUpdate(
                    {_id: input._id},
                    {...input},
                    {new: true}
                )

                return snippet
            }

            throw new AuthenticationError("You are not logged in!")
        },
        addComment: async(parent, {_id, commentText} , context) => {
            if(context.user){
                const commentAuthor = context.user.username;
                const commentDate = Date.now()

                const snippet = await Snippet.findOneAndUpdate(
                    {_id},
                    {$addToSet: {comments: {commentText, commentAuthor, commentDate}}},
                    {new: true, runValidators: true}

                ).populate("comments")

                return snippet
            }
        }
    }
};

module.exports = resolvers;