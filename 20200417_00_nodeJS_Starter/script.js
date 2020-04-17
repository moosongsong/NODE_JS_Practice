var jumsu = [90, 89, 94, 87, 92, 88, 90, 98];

jumsu.sort(function(a,b){
	return (a-b);
});

jumsu.forEach(function(item, index){
	console.log(jumsu[index]);
});

/////////////////////////////////////////////

var student = [
	{name : 'choi', kor:90, eng:10, math:50},
	{name : 'lee', kor:80, eng:40, math:60},
	{name : 'kim', kor:70, eng:50, math:70},
	{name : 'sim', kor:60, eng:30, math:80},
	{name : 'hong', kor:50, eng:20, math:90}
];

function getTotal(a){
	return (a.kor + a.eng + a.math);
}

student.sort(function(a, b){
	return getTotal(b)-getTotal(a);
});

student.forEach(function(item, index){
	console.log(item);
});
