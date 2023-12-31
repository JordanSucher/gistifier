import prisma from '../../prisma'
import { getServerSession } from "next-auth"
import { authOptions } from "../../api/auth/[...nextauth]/authOptions"
import Link from "next/link"
import HighlightCard from "../../ui/Highlights/HighlightCard"

export default async function Summaries () {
    
    let session = await getServerSession(authOptions)

    let episodes = await prisma.episode.findMany({
        include: {
            summaries: {
                include: {
                    highlights: true
                }
            },
            publication: true
        },
        where: {
            summaries: {
                some: {
                    highlights: {
                        some: {
                            userId: session.user.id
                        }
                    }
                }
            }
        },
        orderBy: {
            publishedAt: 'desc'
        }
    });


    return (
        <div className='px-8 w-full h-full max-w-[1000px] mt-[10px] self-center mx-24'>
            <h1 className="text-xl m-0 p-0 mb-5">Your Highlights</h1>
            {episodes.map((episode, index) => {
                return (
                    <HighlightCard key={index} episode={episode} />
                )
            }
            )}
        </div>
    )
}