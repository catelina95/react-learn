type Props = {
  name: string;
  age?: number;
};

const Demo = ({ name, age = 18 }: Props) => {
  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log("点赞", e);
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("输入", e.target.value);
  };

  return (
    <div>
      Hello, my name is {name}, I'm {age} years old.
      <button onClick={handleLike}>点赞</button>
      <input onChange={handleInput} type="text" />
    </div>
  );
};

export default Demo;
