import React from "react";
import {favoruitesAtom} from "../../store";
import {atom, useAtom} from "jotai";
import ArtworkCard from "@/components/artwork/ArtWorkCard";

export default function Favourite() {
    const [favouriteList] = useAtom(favoruitesAtom);
    if (!favouriteList){
        return null;
    }
    if (favouriteList.length === 0) {
        return <p> &#39;Nothing Here Try adding some new artwork to the list.&#39;</p>
    }
    return (<div>
        {favouriteList.map((objectID) => (
            <ArtworkCard key={objectID} objectID={objectID}/>
        ))}
    </div>)
}