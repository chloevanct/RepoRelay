import './ProjectCard.css'

export default function ProjectCard({card}) {
    return (
        <div id='projectCard'>  
            <img className='projectCardImage' src={card.projectImg} alt={card.projectName} />
            <div id='projectInfoBody'>
                <div id='detailsAndTags'>
                    <div id='pojectDetails'>
                        <div id='nameAndAuthor'>
                            <h3>{card.projectName}</h3>
                            <p id='postedBy'>{card.postedBy}</p>
                        </div>
                        <div id='activityDates'>
                            <p>Posted: {card.postedDate}</p>
                            <p>Last activity: {card.lastActivityDate}</p>
                        </div>
                        <p id='projectDescription'>{card.projectDescription}</p>
                    </div>
                    <div id='projectTags'>
                        <ul id='tagsList'>
                            {card.projectTags.map((tag, index) => (
                                <li key={index}>{tag}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>            
        </div>
    )
}