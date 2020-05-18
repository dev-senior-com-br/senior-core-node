export default class  FilterBuilder {
	private  filter : string = "";
	
	field = (fieldName: string): FilterBuilder => {
		this.filter += fieldName;
		return  this;
	};
	
	equals = (value: string): FilterBuilder  => {
		this.filter += ` eq '${value}'`;
		return  this;
	};
	
	notEquals = (value: string): FilterBuilder  => {
		this.filter += ` ne ${value}`;
		return  this;
	};
	
	lowerThan = (value: string): FilterBuilder  => {
		this.filter += ` lt ${value}`;
		return  this;
	};
	
	greaterThan = (value: string): FilterBuilder  => {
		this.filter += ` gt ${value}`;
		return  this;
	};
	
	lowerOrEquals = (value: string): FilterBuilder  => {
		this.filter += ` le ${value}`;
		return  this;
	};
	
	greaterOrEquals = (value: string): FilterBuilder  => {
		this.filter += ` ge ${value}`;
		return  this;
	};
	
	and = (): FilterBuilder  => {
		this.filter += ` and `;
		return  this;
	};
	
	or = (): FilterBuilder  => {
		this.filter += ` or `;
		return  this;
	};
	
	containing = (fieldName: string, value: string): FilterBuilder  => {
		this.filter += ` containing(${fieldName}, '${value}')`;
		return  this;
	};
	
	isNull = (): FilterBuilder  => {
		this.filter += ` is null`;
		return  this;
	};
	
	withCustomFilter = (filter: string) : FilterBuilder  => {
		this.filter = filter;
		return this;
    }

    build = () : string => {
        return this.filter;
    }
}