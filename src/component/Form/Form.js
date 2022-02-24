import classes from "./Form.module.css";
import Button from "../Button/Button";

function Form(props) {
  const fields = [];

  props.formFields.forEach((field) => {
    fields.push(
      <div key={field.name} >
        <input
          className={classes["input"]}
          type={field.type}
          name={field.name}
          value={field.value}
          onChange={props.changeHandler}
          placeholder={field.placeholder}
        />
      </div>
    );
  });

  return (
    <div className={classes["form-holder"]}>
      <h1> {props.formTitle} </h1>
      <p> {props.errorMsg} </p>
      <form className={classes["form"]}>
        {fields}
        <Button type="submit" onClickHandler={props.uploadHandler}>
          {props.btnText}
        </Button>
      </form>
    </div>
  );
}

export default Form;
