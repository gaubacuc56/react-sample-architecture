import { useMemo } from "react"
interface IAvatarProps {
    name?: string
    url?: string
    imageClassname?: string
    textClassname?: string
}
const Avatar = (props: IAvatarProps) => {
    const { name, url, imageClassname, textClassname } = props
    const textDisplay = useMemo(() => {
        if (name !== undefined) {
            const firstName = name.split(" ")[0]
            const lastName = name.split(" ").slice(-1).join(" ")
            return `${firstName[0]} ${lastName[0]}`
        }
    }, [name])

    return url ? (
        <img className={imageClassname} src={url} alt="avatar" />
    ) : (
        <div
            className={`w-[3rem] h-[3rem] rounded-full bg-gray-200 uppercase text-black font-semibold text-center leading-[3rem] cursor-default ${textClassname}`}
            style={{ userSelect: "none" }}
        >
            {textDisplay}
        </div>
    )
}
export default Avatar
