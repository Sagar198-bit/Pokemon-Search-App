function PokeMoncard({ pokemonedata }) {
  

  return (
    <div className=" h-[100%] p-1 bg-transparent">
      <ul className=" p-5 grid md:grid-cols-4  grid-cols-1 auto-rows-auto  gap-y-5 place-items-center text-black w-screen bg-white">
        {pokemonedata.map((items, index) => {
          const {
            sprites: {
              other: {
                dream_world: { front_default },
              },
            },
          } = items;

          const { name, weight, height } = items;
          const { base_experience } = items;

          const { types } = items;
          const { abilities } = items;

          return (
            <li
              key={index}
              className=" p-2 w-[300px] text-black border border-black "
            >
              <div>
                <div className="flex justify-center items-center">
                  <img src={front_default} className="h-[150px] w-[200px]" />
                </div>
                <div className=" mt-5 text-[15px] font-semibold">
                  <span className="bg-lime-400 rounded-3xl px-5 py-1">
                    {name}
                  </span>
                </div>
                <div className="mt-5 text-[15px] font-semibold">
                  Type :{types[0].type.name}
                </div>
              </div>

              <div className="flex justify-center mt-2 space-x-2 text-[15px] font-semibold ">
                <div>Height : {height}</div>
                <div> Weight : {weight}</div>
                <div>Experince: {base_experience}</div>
              </div>

              <div className=" mt-2 text-[15px] font-semibold">
                Abilities:
                {abilities[0].ability.name}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PokeMoncard;
