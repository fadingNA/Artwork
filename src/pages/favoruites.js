import React from "react";
import {favoruitesAtom} from "../../store";
import {atom, useAtom} from "jotai";
import ArtworkCard from "@/components/artwork/ArtWorkCard";

export default function Favourite() {
    const [favouriteList] = useAtom(favoruitesAtom)
    if (favouriteList.length === 0) {
        return <p>'Nothing Here Try adding some new artwork to the list.'</p>
    }
    return (<div>
        {favouriteList.map((objectID) => (
            <ArtworkCard key={objectID} objectID={objectID}/>
        ))}
    </div>)
}