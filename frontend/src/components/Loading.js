import { useLoading,  BallTriangle, ThreeDots } from "@agney/react-loading";
import { useEffect, useState } from "react";

function Loading(props) {

  const [tipo,setTipo] = useState(<></>);

  useEffect(()=>{
    (props.className==="cargando-pantalla")?setTipo(<BallTriangle width="50" />):setTipo(<ThreeDots width="50" />);
  },[]);

  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: tipo,
  });

  return (
    <section
      {...containerProps}
      className={props.className}
    >
      {indicatorEl}
    </section>
  );
}

export default Loading;
