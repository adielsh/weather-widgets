import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Weather } from '../Helpers/Weather';

@Component({
  selector: 'weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {

  city:string = "";

  @Input() item!: Weather;
  
  @Output() delete: EventEmitter<any> = new EventEmitter();


  startDate : any = "";
  wide_data: any;
  day:string="";
  month:string="";
  year:string="";

  weatherIconUrl : string = "";

  constructor() { 

  //   this.campaignOne = new FormGroup({
  //     date: new FormControl(new Date())
  //   });
   }

  ngOnInit(): void {
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.startDate = event.value;
  }
  editWeatherCard(){
    this.startDate == "";
    this.city == "";
    this.item.status = "Edit";
  }
  deleteCard(){
    this.delete.emit(this.item.id);
  }
  saveWeather(){
    if(this.startDate == "") {
      alert("Please fix date");
      return;}

    this.year = this.startDate.getFullYear();
    this.month = this.startDate.getMonth()+1;
    this.day = this.startDate.getDate();
   
    if(this.city == "") {         
       alert("City cannot be empty")
       return;
    } 
    fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query=${this.city}`)
    .then(response => response.json())
    .then(data => {
      if(!data[0]) {
        alert("Please fill correct city name")
        return;}
      this.city = data[0].title;
      
      fetch(`https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/${data[0].woeid}/${this.year}/${this.month}/${this.day}/`)
      .then(response => response.json())
      .then(data => {
        if(!data || !data[0]){
          alert("Please fix date")
          return;
        }
        this.item.status = "show";
        this.wide_data = data[0];
        this.weatherIconUrl = `https://www.metaweather.com/static/img/weather/ico/${this.wide_data.weather_state_abbr}.ico`;
        this.wide_data.min_temp = Math.trunc(this.wide_data.min_temp);
        this.wide_data.max_temp = Math.trunc(this.wide_data.max_temp);
      })
    });
  }
}
