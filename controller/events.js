const Event = require('../models/Event')

const getEvents = async(req, res)=>{

    try {

        const findEvents = await Event.find().populate('user','name')

        return res.status(200).json({
            ok: true,
            findEvents
        })

    } catch (error) {
        return res.status(404).json({
            ok: false,
            message: error
        })
    }
}
const createEvent = async(req, res)=>{

    const newEvent = new Event(req.body)

    try {

        newEvent.user = req.uid
        
        const eventResponse = await newEvent.save()
        return res.status(201).json({
            ok:true,
            message:'Event create',
            event:eventResponse
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            message: 'Problemas con BD'
        })
    }

}
const updateEvent = async(req, res)=>{

    const {id:eventId} = req.params//note id
    const userId = req.uid //user id
    const event = await Event.findById(eventId)

    if (!event) {
        return res.status(404).json({
            ok:false,
            message:'Event dont exist with this id',
        })
    }
    try {
        if (userId.toString() === event.user.toString()) {
            const newEvent = await Event.findByIdAndUpdate(event.id,req.body,{new:true})
            return res.status(201).json({
                ok:true, 
                message:newEvent
            })
        }else{
            res.status(401).json({
                ok: false,
                message: 'You dont have permission to update'
            })
        }

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error
        })
    }

}
const deleteEvent = async(req, res)=>{

    const {id:eventId} = req.params//note id
    const userId = req.uid //user id
    const event = await Event.findById(eventId)
    if (!event) {
        return res.status(404).json({
            ok:false,
            message:'Event dont exist with this id',
        })
    }
    try {
        if (userId.toString() === event.user.toString()) {
            const eventDelete = await Event.findByIdAndRemove(event.id)
            return res.status(200).json({
                ok:true, 
                message:'Event Delete successfully',
                eventDelete
            })
        }else{
            res.status(401).json({
                ok: false,
                message: 'You dont have permission to delete'
            })
        }

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Problems to delete'
        })
    }
        
}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}