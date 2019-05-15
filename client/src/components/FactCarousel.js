import React, { Component } from "react";

import makeCarousel from "react-reveal/makeCarousel";
import Slide from "react-reveal/Slide";
import styled, { css } from "styled-components";

let factsObj = {
  "gvMxUlS2VoU": [
    "Pandas are one of the most critically endangered species on our planet.",
    "Giant pandas were classified as an endangered species in the 1980s.",
    "There are only an estimated 1600 pandas in the wild and about 325 in captivity",
    "Pandas eat 24-40 pounds of bamboo a day, but they will also eat flowers, fix, and meat in captivity.",
    "Pandas spend up to 16 hours a day eating."
  ],
  "ktPv2E-FmmM": [
    "Jedediah Smith Redwood State Park is a 10,000-acre park in northern California.",
    `Jedediah Smith Redwood State Park is home to 7% of the world's remaining old-growth redwoods.`,
    `The 21-mile long Smith River is one of the few major rivers in the US that is not dammed.`,
    "Dams impede the spawning of salmon, so this free-flowing river plays an important role in the larger Pacific Northwest ecosystem.",
    "These trees are coast redwoods, which are coniferous evergreen trees belonging to the cypress family."
  ],
  "2mVQ2bWapqo": [
    "Depending on species, chipmunks can be gray to reddish-brown in color with contrasting dark & light stripes on the sides of their face & across their back & tail.",
    `The chipmunk's bird-like chirp is usually made upon sensing a threat, but is also used by females as a mating call.`,
    "Chipmunks are found in North America, with the exception of the Siberian chipmunk which is found primarily in Asia.",
    "Chipmunks have an omnivorous diet consisting of seeds, nuts, and other fruits, and buds."
  ],
  "dQQimQsCTgE": [
    `The gorilla cam shows the Grauer's gorillas inside their 39-acre forest habitat at GRACE`,
     `The forest's former wild gorilla habitat makes it ideal for the orphans to practice skills` ,
     `Such skills needed for the wild are foraging, nest building, & coordinating group travel.`,
    `GRACE is located in a remote part of Democratic Republic of Congo within a transition zone`,
    `The zone is between the lowland forests in the Congo Basin & the highlands of the Albertine Rift, both areas of incredible biodiversity.`,
    `GRACE is an award-winning sanctuary that provides emergency veterinary care & rehabilitation for rescued gorillas`,
    `Gorillas sanctuary includes a chance to live in a group with other orphans, forming a surrogate family.`,
    "The gorillas are orphans rescued after being captured during packing events that killed their families."
  ],
  "deWeERCVc2o": [
    "Little is known about the adults of this nest, although they are both sexually mature bald eagles older than five years of age.",
    "The eagles eat both alive and dead fish, squirrels, other birds, rabbit, muskrat, deer, possum, and anything else they can catch or find.",
    "This nest is the third nest built on this territory in seven years. It's not known whether the same pair of eagles have been here all along.",
    "The nest is nine feet longs at its longest point and seven feet wide at its widest point and about 5.5 feet high.",
    "This nest has a total are of 49 square feet, very large for a bald eagle nest."
  ],
  "b-AAXWdjZv0": [
    "With a maximum depth of 1,640 feet (about 500 meters), Lake Tahoe is the second deepest lake in the United States.",
    `At the surface, Lake Tahoe's water temperature varies from 41-68 degrees Fahrenheit.`,
     `Below 600 feet, the water temperature is a constant 39 degrees.`,
    "The surface of Like Tahoe is at an elevation of 6,220 feet above sea level.",
    "Lake Tahoe is a large freshwater lake in the northern Sierra Nevada mountains on the California-Nevada border.",
    "Lake Tahoe exists in a fault basin created about 25 million years ago around the same time the Sierra Nevada mountains were formed."
  ],
  "HEQ6blgEZwU": [
    'Ospreys may travel more than 160,000 miles during their lifetime migrating to South and Central America for winter.',
    `The ospreys' opposable toes and barbed footpads allows them to hold onto their catch as they return to the nest.`,
    `The word 'osprey' is thought to come from one of two Latin terms: 'avis pride', which means 'bird of prey' or 'ossifragus' which means 'bone-breaker.`,
    `About 99% of an osprey's diet is fish, from either fresh or saltwater.`,
    `Almost all osprey nests are within a 12 mile radius of a fish-filled water source.`
  ],
  "z5F1a7_dsrs": [
    'This camera is hidden at a secluded watering hole. It is completely solar powered due to its remote location.',
    'A borehole replenishes much needed water for the animals that frequent this area.',
    `From here you can watch the 'Big Five' animals in Africa: lions, leopards, elephants, rhinos, and buffalo.`,
    'Giraffes and a large variety of antelopes, genets, squirrels, warthogs, and Giant kingfishers also converge at this key watering point.'
  ],
  "mhFipoyCQzo": [
    `Pronghorn antelope, which are found in the Grasslands, are the latest land animal in North America.`,
    `In October 2009, Grasslands National Park was designated the Darkest Dark Sky Preserve in Canada.`,
    "The East Block Badlands are the richest resource for dinosaur fossils in Canada.",
    `The Grasslands is home to the black-footed ferret - often considered North America's most endangered mammal.`,
    "In less than one century, the native grasslands have become one of the most endangered biomes in the world.",
    `During the breeding seasons, the bulls bellow, producing a sound that can be heard several miles away.`
  ],
  "NVCi9yYwRCY": [
    "Tigers love to swim.",
    `The earliest known portrayal of the Royal Bengal Tiger in India comes to us from the Indus Valley Civilization where a 2,500 BC seal featuring a tiger was found.`,
    `At the current rate of poaching and habitat loss, it is estimated that tigers in the wild will completed disappear within the next 5 - 10 years.`,
    "Bengal Tigers are native to India, Nepal, and Bangladesh.",
    `Tigers are fully grown at 3-4 years of age.`
  ],
  "TL0weAv8C9s": [
    `South Africa takes up only about 1% of the land on earth but supports 10% of the world's known bird, fish, and plant species and 6% of its mammal and reptile species.`,
    `South Africa sports the world famous Kruger National Park and 9,000 private game reserves dedicated to protecting its wildlife.`,
    `There are only around 29,000 - 47,000 lions left. Their biggest threat is hunting.`,
    "The African elephant is the largest living land mammal.",
    `There are around 600,000 elephants left. Their biggest threat is poachers, hunting them for their tusks.`
  ],
  "uj3FqkflC7g": [
    `The NASA Space cam comes to us from the International Space Station and careens around the Earth at an average of 17,000 mph.`,
    "Since the station orbits the Earth once every 90 minutes, it experiences a sunrise or a sunset about every 45 minutes.",
     `Live video from the International Space Station includes internal views when the crew is on-duty.`,
    "When the station is in darkness, external camera video may appear black however can also provide spectacular views of lightning or city lights below.", `NASA's High Definition Earth Viewing experiment's equipment was activated on April 30, 2014.`,
    `The videos are mounted on the External Payload Facility of the European Space Agency's Columbus module.`
  ],
  "CEzSXX3tcmU": [
    `Containing 350,000 gallons of water and over 1,000 animals, the tropical reef habitat is the Aquarium of the Pacific's largest exhibit.`,
    `The reef represents the famous "blue corner" off the coast of Palau, an area considered to be one of the most beautiful and diverse oceanic sites in the world.`,
    `This reef contains Sea Horses and Sea Dragons. Seahorses and seadragons, as well as pipefish and ribbonfish, are all in the family Syngnathidae, which contains more than 200 species.`,
     "This reef is home to a Banded Sea Krait, a venomous sea snake with distinctive black and white rings. Sea kraits have many adaptations that enable them to live in both marine and land environments.",
    `In addition to the marine animals, you may even catch a diver on camera, giving an underwater lecture or feeding the fish!`,
    "The turtle in this reef tank is an Olive Ridley turtle, which is the smallest and most common of all seven sea turtle species. They get their name from the olive coloration of their shell.",
    `Despite its name, the Zebra Shark in this tank has distinctive, cheetah-like spots.`,
    `The rays you see gliding through the tank are Cownose Rays. Although cownose rays are sometimes referred to as skates or stingrays, they are technically neither. Cownose rays belong to their own family of rays.`
  ],

  "ZIC8QmBKRHc": [
    `One of the manatee's closest modern relatives is the elephant.`,
    "Manatees typically move slowly, but can swim up to 20 miles per hour.",
    "Adult manatees have no natural predators.",
    "Manatees front flippers help them steer, or sometimes crawl, through shallow water.",
    "Manatees can be found in the warm waters of shallow rivers, bays, estuaries and coastal waters. Rarely do individuals venture into waters below 68 degrees Fahrenheit.",
    "Manatees are herbivores, with a diet consisting mostly of sea grasses and freshwater vegetation.",
    `Manatees can grow to be as large as 3,500 pounds (1590 kg) and 13 feet (4.0 m) in length.`,
    `Save the manatees!!!! (Most human-related manatee fatalities occur from collisions with watercraft.`
  ],


  "HYknTgcw2BM": [
    `In this tank, you might spot a Flying Gunnard, a fish impressive pectoral fins that allow them to 'walk' along the ocean floor.`,
    "This tropical fish cam features mainly anthias and wrasse, though there are also others, including cowfish and angelfish.",
    `Wrasse are a type of brightly colored tropical fish found on coral reefs. There are over 580 species of wrasse, ranging in size from 2 inches to 6.5 feet. Some smaller species of wrasse act as "cleaners'; they will pick off and eat the external parasites on larger fish.`,
    `Most tropical coral reefs around the world are home to swarms of pink, orange, and yellow fish, many of which are anthias.`,
     `A generally small fish that feeds primarily on zooplankton, anthias form complex social structures called "harems" based on their location on the reef and the ratio of male to female fish in the population.`,
    "Corals are marine invertebrates within the class Anthozoa of the phylum Cnidaria. They typically live in compact colonies of many identical individual polyps.",
    "Much of the coral in this tank is fan coral, a type of soft coral that does not produce a calcium skeleton."
  ],


  "qWlU7hWEl8c": [
    `Every summer, the brown bears of Katmai National Park in Alaska flock to Brooks Falls to hunt the sockeye salmon fighting their way upstream to spawn.`,
     `All grizzly bears are brown bears, but not all brown bears are grizzly bears. The bears you are watching on the cams are brown bears.`,
      `On days when many salmon are migrating in the river, a large and dominant male bear will sometimes catch and eat more than 30 fish per day.`,
      `The shoulder hump on a brown bear is a mass of muscle used to assist them while digging for roots, squirrels, etc.`,
       `It allows the bear to apply tremendous pressure to the ground to dig.`,
      `Katmai's brown bears are some of the largest bears in the world. They can stand 3-5 feet  at the shoulder and measure 7-10 feet in length.`,
       `Sockeye salmon are usually 3-5 years old when they return to spawn.`,
       'A typical sockeye will spend 1-2 years in fresh water before migrating to sea and 2-3 years in the ocean before reversing the journey.',
       `Despite their enormous size, brown bears are extremely fast--they've been clocked running at 30 miles per hour!`
  ],

  "n6eMRYuo86Y": [
    `Gray seals, also known as Atlantic seals or horsehead seals, are native to the north Atlantic Ocean. They are sociable animals that form colonies for breeding and feeding.`,
    "The gray seals featured on this camera are found on Seal Island, off the coast of Maine.",
    "Sea lions are able to rotate their back flippers under their body, which allows them to walk on land, but Seals can't.",  "Seals are forced to flop around on their bellies when onshore, similar to the motion of a caterpillar.",
    `Seal Island National Wildlife Refuge (NWR) is a 65-acre offshore island located in outer Penobscot Bay in Maine.`,
    `Gray seals are opportunistic predators, feeding on up to 30 different species of fish and occasionally crustaceans and mollusks.`,
    "Gray seals are well adapted to a life at sea. Adults have two layers of thick fur and a thick blubber layer to keep them warm.",
    `Seals can dive to depths of nearly 1,000 feet when feeding.`
  ],

  "fqssZSX1bFo": [
    `The Walrus Islands State Game Sanctuary was created in 1960 by the Alaska State Legislature.`,
    "The sanctuary was created to protect the last remaining terrestrial bailout for Pacific walruses in North America.",
    "The Alaska Department of Fish and Game manages the sanctuary to protect these habitats and wildlife species.",
    "The Pacific walruses hauling out at Round Island are predominantly males.",
    `Several thousand male walrus stay within Bristol Bay throughout the summer to feed and rest at local land-based haulouts.`
],

"O6Ir_sMsTtc": [
  `Ospreys may travel more than 160,000 miles during their lifetime migrating to South and Central America for the winter.`,
   `When the chicks hatch, they rely on their parents to bring foods.`,
   `The separation in hatch time can be a disadvantage for the younger chicks when food is scarce, since older chicks can dominate when parents bring the fish back to the nest.`,
   `Opposable toes and barbed footpads allow them to hold onto their catch as they return to the nest.`,
   `Almost all osprey nests are within a twelve mile radius of a fish-filled water source.', 'Ospreys are found on every continent except Antarctica, usually in coastal areas or near rivers or lakes.`
  ],

  "L2Qln30b2nE": [
    `The word ‘meditation’ derives from the Latin word “meditate,” which means “to ponder.`,
     `The act of meditating involves a combination of concentration, contemplation, and the practice of abstraction, or focusing on ideas rather than occurrences or events.`
    ],


"F7wVASdvp8c": [
  `Dumpling Mountain ranges 1500-1600 ft high along a 2.5 mile trek.`,
   `The summit overlooks a gorgeous vista of Naknek lake below.`,
    `The largest glaciers in the park are 3-4 miles wide and 10-12 miles long. These glaciers feed a series of rivers, ponds, streams, and marshes.`,
    `Katmai National Park covers 4,093,077 acres, which is roughly the size of Wales.`,
    `The park includes 18 volcanoes. 7 have been active since 1900, making Katmai one of the world’s most active volcanic centers today.`,
     `The Novarupta eruption on June 6 -9, 1912 was the greatest volcanic eruption in the 20th century.`
    ],



"thHgzWlveqs": [
  `With a maximum depth of 1,640 feet, Lake Tahoe is the second deepest lake in the United States.`,
  `At the surface, Lake Tahoe’s water temperature varies from 41-68 degrees.`,
  `The surface of Lake Tahoe is at an elevation of 6,220 feet above sea level.`,
   `Lake Tahoe is a large freshwater lake in the norther Sierra Nevada mountains on the California-Nevada border.`,
   `Lake Tahoe exists in a fault basin created about 25 million years ago around the same time the Sierra Nevada mountains were formed.`
  ]

};
// deWeERCVc2o: ['yay eagles', 'I heart eagles', 'baby Grace is growing up!'],
// uj3FqkflC7g: ['outer space cam!', 'I love NASA', 'I want to be an astronaut'],
// CEzSXX3tcmU: ['scuba cam', 'under the sea'],

const width = "890px",
  height = "85px";

const Container = styled.div`
  border: 1px solid white;
  position: center;
  overflow: hidden;
  width: ${width};
  height: ${height};
`;

const Children = styled.div`
  width: ${width};
  position: relative;
  height: ${height};
`;
//   text-shadow: 1px 1px 1px #fff;
const Arrow = styled.div`
  z-index: 100;
  line-height: ${height};
  text-align: center;
  position: absolute;
  top: 0;
  width: 10%;
  font-size: 3em;
  cursor: pointer;
  user-select: none;
  ${props =>
    props.right
      ? css`
          left: 90%;
        `
      : css`
          left: 0%;
        `}
`;

const Dot = styled.span`
  font-size: 1.5em;
  font-color: white;
  cursor: pointer;
  text-shadow: 1px 1px 1px #fff;
  user-select: none;
`;
const Dots = styled.span`
  text-align: center;
  color: white;
  width: ${width};
  z-index: 100;
`;

const CarouselUI = ({ position, total, handleClick, children }) => (
  <Container>
    <Children>
      {children}
      <Arrow onClick={handleClick} data-position={position - 1}>
        {"<"}
      </Arrow>
      <Arrow right onClick={handleClick} data-position={position + 1}>
        {">"}
      </Arrow>
    </Children>
    <Dots>
      {Array(...Array(total)).map((val, index) => (
        <Dot
          className="dot"
          key={index}
          onClick={handleClick}
          data-position={index}
        >
          {index === position ? "● " : "○ "}
        </Dot>
      ))}
    </Dots>
  </Container>
);

const Carousel = makeCarousel(CarouselUI);

class FactCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facts: []
    };
  }

  componentDidMount() {
    console.log("****HERE IN FACT CAROUSEL");
    for (let key in factsObj) {
      if (key === this.props.destination) {
        console.log(key, "key");
        let theseFacts = factsObj[key];
        this.setState({
          facts: theseFacts
        });
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.destination !== prevProps.destination) {
    for (let key in factsObj) {
      if (key === this.props.destination) {
        console.log(key, "key");
        let theseFacts = factsObj[key];
        this.setState({
          facts: theseFacts
        });
      }
    }
  }
  }

  render() {
    return (
      <div className="carousel">
        <Carousel>
          {this.state.facts.map(fact => (
            <Slide right>
              <div className="facts">
                <p>{fact}</p>
              </div>
            </Slide>
          ))}
        </Carousel>
      </div>
    );
  }
}

export default FactCarousel;
