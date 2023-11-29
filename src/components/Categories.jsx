const Categories = ({ changeCategory, categoryes }) => {
    const listCategories = [
        "Все",
        "Мясные",
        "Вегетарианская",
        "Гриль",
        "Острые",
        "Закрытые"
    ];

    return (
        <div className="categories">
            <ul>
                {listCategories.map((category, i) => (
                    <li
                        key={i}
                        onClick={() => changeCategory(i)}
                        className={categoryes === i ? "active" : ""}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Categories;
