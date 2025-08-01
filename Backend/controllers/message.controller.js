import Conversation from '../models/conversation.model.js';
import Message from '../models/message.model.js';

export const sendMessage = async(req,res) =>{
   try {
    const {message} = req.body;
    const {id : receiverId} = req.params;
    const senderId = req.user._id;

    let  conversation = await Conversation.findOne({
      participants : {$all : [senderId,receiverId]},
    })

    if(!conversation){
      conversation = await Conversation.create({
        participants:[senderId,receiverId],
      })
   
    }
    const newMessage = new Message({
      senderId ,
      receiverId,
      message
    })
    if(newMessage){
      conversation.messages.push(newMessage._id);
    }

    //Socket.io functionality can be added here to emit the new message to the receiver


    // await conversation.save();
    // await newMessage.save();

    //this will run parallelly
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(200).json(newMessage);
    
   } catch (error) {
    console.log("Error in Send message Controller:",error.message)
    res.status(500).json({error :"Internal Server Error"});
    
   }
};

export const getMessages = async(req,res) =>{
  try {

    const {id :userToChatId} = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants : {$all : [senderId,userToChatId]},
    }).populate('messages'); //Not reference but the actual messages

    if(!conversation){
      return res.status(404).json({error :"Conversation not found"});
    }

    res.status(200).json(conversation.messages);

  } catch (error) {
    console.log("Error in Get messages Controller:",error.message)
    res.status(500).json({error :"Internal Server Error"});
   }
}