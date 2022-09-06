import React from "react"

const DateEntry = ({ date, isRequest = false }) => {
    return <div className="sidebar-date-entry">
        <img src={date.playmate.imageUrl} alt={date.playmate.name} />
        {isRequest
            ? <DateRequest date={date} />
            : <FutureDate date={date} />
        }
    </div>
}

const FutureDate = ({ date }) => {
    return (
        <div>
            {date.playmate.name} wants to play with you on {new Date(date.time).toLocaleDateString()}
            <div>
                <button>
                    <i class="fa-solid fa-pen" />
                </button>
            </div>

        </div>
    )
}

const DateRequest = ({ date }) => {
    return (
        <div>
            A date with {date.playmate.name} on {new Date(date.time).toLocaleDateString()}
            <div>
                <button>
                    <i class="fa-sharp fa-solid fa-check" />
                </button>
                <button>
                    <i class="fa-solid fa-xmark" />
                </button>
            </div>
        </div>
    )
}

export default DateEntry