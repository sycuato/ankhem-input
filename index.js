var Button = require('ankhem-button');

var Input = React.createClass({

	render: function() {
		return this.renderInput();
	},

	// Special Event
	componentWillMount: function(){
		this.replaceState(this.constructStateByField(this.props.field.name));
	},

	eventChange: function(name, event) {

		var state = {
			[name] : event.target.value
		}

		// update input state
		this.setState(state);
		// update form state
		this.props.onChange(state);
	},

	renderInput: function(){

		var field = this.props.field;

		var props = {
			className: 		"form-control",
			type: 			field.type,
			placeholder: 	field.placeholder,
			value: 			this.state[field.name],
			onChange: 		this.eventChange.bind(this, field.name)
		}

		var input = (
			<input {...props} />
		);

		switch(field.render)
		{
			case 'group-with-btn':
				return this.renderInputGroupWithBtn(input, field.button);
				break;
			default:
				return input;
				break;
		}
	},

	renderInputGroupWithBtn: function(input, button){
		return (
			<div className="input-group">

				{input}

				<span className="input-group-btn">
					<Button type={button.type} data={button} />
				</span>
			</div>
		);
	},

	// Util

	constructStateByField: function(name){

		var newState = {
			[name] : this.props.field.value
		};

		return newState;
	},
});

module.exports = Input;