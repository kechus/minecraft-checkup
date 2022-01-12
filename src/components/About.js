import '../App.css'

const About = () => {
  return (
    <div>
      <p className='title'>Minecraft advancement checker </p>
      <p>
        This website gives you a more detailed rundown of the criteria you are missing to complete Minecraft's advancements that have a progress,
        wich are: "A Balanced Diet", "Adventuring Time", "A Complete Catalgoue", "Hot Tourist Destination", "Monsters Hunted" and "Two by Two";
        It uses a file located in your world save folder and compares it to one that already has completed all of the achievements.
      </p>

      <p>
        This website only works with the Java version of the game
      </p>
    </div >
  );
}

export default About;