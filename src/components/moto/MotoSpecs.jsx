const MotoSpecs = ({ moto }) => {
    const specs = [
        { label: "YEAR", value: moto.productionYear },
        { label: "ENGINE", value: moto.displacement ? `${moto.displacement}cc` : "—" },
        { label: "POWER", value: moto.horsepower ? `${moto.horsepower}hp` : "—" },
        { label: "RATING", value: moto.averageRating?.toFixed(1) ?? "—" },
    ]

    return (
        <div className="grid grid-cols-4 gap-2">
            {specs.map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center justify-center border border-zinc-200 dark:border-zinc-800 rounded-lg px-2 py-3">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-1">
                        {label}
                    </span>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                        {value ?? "—"}
                    </span>
                </div>
            ))}
        </div>
    )
}

export default MotoSpecs
