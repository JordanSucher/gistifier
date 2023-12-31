import SubscriptionCard from "../../ui/Subscriptions/SubscriptionCard"
import AddSubscriptionButton from "../../ui/Subscriptions/AddSubscriptionButton"
import prisma from '../../prisma'
import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]/authOptions"
import { setInterval } from "timers/promises"

export default async function Subscriptions () {

    let session = await getServerSession(authOptions)

    // simulate loading
    await new Promise (resolve => setTimeout(resolve, 3000))

    let subscriptions = session ? await prisma.subscription.findMany({
        where: {
            userId: session.user.id
        },
        include: {
            publication: true
        }
    }) : []

    setInterval(async () => {
        console.log("Updating subscriptions")
        // update subscriptions
        subscriptions = await prisma.subscription.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                publication: true
            }
        })
    }, 60000)

    if (subscriptions.length > 0) {
        return (
            <div className='w-full h-full max-w-[1000px] self-center md:mr-24'>
                <span className="flex flex-col justify-between items-start py-2 px-4 mb-2">
                    <h1 className="text-xl m-0 p-0">Your Subscriptions</h1>
                    <AddSubscriptionButton />
                </span>
                <div className="w-full pr-4">
                    {subscriptions.map((subscription, index) => (
                        <SubscriptionCard
                            key={index}
                            subscription={subscription}
                        />
                    ))}
                </div>
            </div>
        )
    }
    else {
        return (
            <div className='w-full max-w-[1000px] self-center flex justify-center items-center gap-4'>
                <p className="text-lg">You havent subscribed to anything yet. </p>
                 <AddSubscriptionButton />
            </div>
        )
    }
}