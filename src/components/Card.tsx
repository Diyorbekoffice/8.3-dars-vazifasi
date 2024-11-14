import { FC, useState, useEffect } from "react";

const Card: FC = () => {
    // State for form inputs
    const [logoUrl, setLogoUrl] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [position, setPosition] = useState("");
    const [skills, setSkills] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState("");
    const [jobType, setJobType] = useState("");
    const [location, setLocation] = useState("");
    const [isNew, setIsNew] = useState(false);
    const [isFeatured, setIsFeatured] = useState(false);
    const [cards, setCards] = useState<any[]>([]); // Store cards

    // Retrieve cards from localStorage on page load
    useEffect(() => {
        const storedCards = localStorage.getItem("cards");
        if (storedCards) {
            setCards(JSON.parse(storedCards));
        }
    }, []);

    // Update localStorage whenever cards are updated
    useEffect(() => {
        if (cards.length > 0) {
            localStorage.setItem("cards", JSON.stringify(cards));
        }
    }, [cards]);

    // Handle form submission with validation
    const handleSubmit = () => {
        // Validate required fields
        if (!logoUrl) {
            alert("Logotip URL bo'sh bo'lmasligi kerak");
            return;
        }
        if (!companyName) {
            alert("Kompaniya nomi bo'sh bo'lmasligi kerak");
            return;
        }
        if (!position) {
            alert("Lavozim bo'sh bo'lmasligi kerak");
            return;
        }
        if (skills.length === 0) {
            alert("Hech bo'lmasa bitta ko'nikma tanlash kerak");
            return;
        }
        if (!selectedTime) {
            alert("Vaqtni tanlash kerak");
            return;
        }
        if (!jobType) {
            alert("Ish turini tanlash kerak");
            return;
        }
        if (!location) {
            alert("Joylashuvni tanlash kerak");
            return;
        }

        const newCard = {
            logoUrl,
            companyName,
            position,
            skills,
            selectedTime,
            jobType,
            location,
            isNew,
            isFeatured,
        };

        setCards([...cards, newCard]); // Add new card to state
        // Reset form after submission
        setLogoUrl("");
        setCompanyName("");
        setPosition("");
        setSkills([]);
        setSelectedTime("");
        setJobType("");
        setLocation("");
        setIsNew(false);
        setIsFeatured(false);
    };

    // Focus on the first empty field
    const focusOnEmptyField = () => {
        if (!logoUrl) {
            document.getElementById("logoUrlInput")?.focus();
        } else if (!companyName) {
            document.getElementById("companyNameInput")?.focus();
        } else if (!position) {
            document.getElementById("positionInput")?.focus();
        } else if (skills.length === 0) {
            document.getElementById("skillsCheckbox")?.focus();
        } else if (!selectedTime) {
            document.getElementById("selectedTimeSelect")?.focus();
        } else if (!jobType) {
            document.getElementById("jobTypeSelect")?.focus();
        } else if (!location) {
            document.getElementById("locationSelect")?.focus();
        }
    };

    // Delete a card
    const handleDelete = (index: number) => {
        const updatedCards = cards.filter((_, cardIndex) => cardIndex !== index);
        setCards(updatedCards);
    };

    return (
        <div>
            <div className="max-w-2xl border rounded-lg my-7 m-auto p-10">
                <div className="flex flex-col gap-8 font-bold text-xl">
                    <div>
                        <h1 className="text-4xl font-bold">Vakansiya ma'lumotlarini kiriting</h1>
                    </div>
                    <div className="flex flex-col gap-3">
                        Logotip URL
                        <input
                            className="font-normal border border-gray-700 p-3 rounded-xl"
                            type="text"
                            id="logoUrlInput"
                            placeholder="logotip URL manzilni kiriting"
                            value={logoUrl}
                            onChange={(e) => setLogoUrl(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        Kompaniya nomi
                        <input
                            className="font-normal border border-gray-700 p-3 rounded-xl"
                            type="text"
                            id="companyNameInput"
                            placeholder="Kompaniya nomi"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-8">
                        <label className="flex gap-2">
                            <input
                                type="checkbox"
                                checked={isNew}
                                onChange={() => setIsNew(!isNew)}
                            />
                            Yangi
                        </label>

                        <label className="flex gap-2">
                            <input
                                type="checkbox"
                                checked={isFeatured}
                                onChange={() => setIsFeatured(!isFeatured)}
                            />
                            Featured
                        </label>
                    </div>
                    <div className="flex flex-col gap-3">
                        Lavozimi
                        <input
                            className="font-normal border border-gray-700 p-3 rounded-xl"
                            type="text"
                            id="positionInput"
                            placeholder="Fullstack Developer"
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-24">
                        <div className="flex flex-col gap-3">
                            Vaqt
                            <select
                                className="font-normal border border-gray-700 py-2 px-4 rounded-lg"
                                id="selectedTimeSelect"
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                            >
                                <option value="option1">Tanlang</option>
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="freelance">Freelance</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-3">
                            Ish turi
                            <select
                                className="font-normal border border-gray-700 py-2 px-4 rounded-lg"
                                id="jobTypeSelect"
                                value={jobType}
                                onChange={(e) => setJobType(e.target.value)}
                            >
                                <option value="option1">Tanlang</option>
                                <option value="remote">Remote</option>
                                <option value="office">Office</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-3">
                            Joylashuv
                            <select
                                className="font-normal border border-gray-700 py-2 px-4 rounded-lg"
                                id="locationSelect"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            >
                                <option value="option1">Tanlang</option>
                                <option value="tashkent">Toshkent</option>
                                <option value="samarkand">Samarkand</option>
                                <option value="bukhara">Buxoro</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        Ko'nikmalar
                        <div className="flex flex-wrap gap-8">
                            <label className="flex gap-3">
                                <input
                                    type="checkbox"
                                    checked={skills.includes("Fullstack")}
                                    onChange={() => {
                                        setSkills((prev) =>
                                            prev.includes("Fullstack")
                                                ? prev.filter((skill) => skill !== "Fullstack")
                                                : [...prev, "Fullstack"]
                                        );
                                    }}
                                />
                                Fullstack
                            </label>

                            <label className="flex gap-3">
                                <input
                                    type="checkbox"
                                    checked={skills.includes("Midweight")}
                                    onChange={() => {
                                        setSkills((prev) =>
                                            prev.includes("Midweight")
                                                ? prev.filter((skill) => skill !== "Midweight")
                                                : [...prev, "Midweight"]
                                        );
                                    }}
                                />
                                Midweight
                            </label>

                            <label className="flex gap-3">
                                <input
                                    type="checkbox"
                                    checked={skills.includes("Python")}
                                    onChange={() => {
                                        setSkills((prev) =>
                                            prev.includes("Python")
                                                ? prev.filter((skill) => skill !== "Python")
                                                : [...prev, "Python"]
                                        );
                                    }}
                                />
                                Python
                            </label>

                            <label className="flex gap-3">
                                <input
                                    type="checkbox"
                                    checked={skills.includes("Frontend")}
                                    onChange={() => {
                                        setSkills((prev) =>
                                            prev.includes("Frontend")
                                                ? prev.filter((skill) => skill !== "Frontend")
                                                : [...prev, "Frontend"]
                                        );
                                    }}
                                />
                                Frontend
                            </label>

                           
                        </div>
                    </div>
                    <div>
                        <button
                            className="border text-white p-3 rounded-xl w-full bg-gray-950 hover:bg-sky-800"
                            onClick={handleSubmit}
                        >
                            Yaratish
                        </button>
                    </div>
                </div>
            </div>
             {/* Display Cards */}
             <div className="flex flex-col w-1/2 gap-20 m-20 items-center justify-center">
                {cards.map((card, index) => (
                    <div key={index} className="border border-gray-300 rounded-lg p-4 flex gap-5">
                        <img src={card.logoUrl} alt="Logo" className="w-20 h-20 rounded-full" />
                        <div className="flex flex-col">
                            <div className="flex gap-2">
                                <h3 className="text-teal-400 ">{card.companyName}</h3>
                                {card.isNew && <span className="text-white bg-teal-400 px-2 rounded-xl">new!</span>}
                                {card.isFeatured && (
                                    <span className="bg-yellow-400 text-white text-sm py-1 px-2 rounded-xl">
                                        Featured
                                    </span>
                                )}
                            </div>
                            <p className="font-bold text-xl">{card.position}</p>
                            <div className="flex gap-2">
                                <p > {card.selectedTime}</p>
                                <p className="before:content-['•'] before:mr-2"> {card.jobType}</p>
                                <p className="before:content-['•'] before:mr-2">{card.location}</p>
                            </div>

                        </div>
                        <p>{card.skills.join(", ")}</p>
                        <button className="bg-red-700 text-teal-50 w-16 h-8 rounded-xl" onClick={() => handleDelete(index)}>Delete</button>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Card;
