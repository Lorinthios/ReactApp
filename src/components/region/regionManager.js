import React, { Component } from 'react';
import { GameMap } from '../game/gameScripts/region';
import { downloadObjectAsJson, loadFileAsJson } from '../../lib/JsonHelper';
import '../../styles/region/regionManager.css';
import { Location, DoorLocation, SignLocation, RegionLocation, Area } from './regionScripts/location';

export class RegionManager extends Component {

    static Instance;

    constructor(params) {
        super(params);

        this.state = {
            cursor: "collider",
            name: "",
            region: {
                colliders: [],
                doors: [],
                jumps: [],
                npcs: [],
                signs: [],
                regions: []
            },
            doorInfo: {
                map: null,
                x: null,
                y: null
            },
            signInfo: {
                signText: ""
            },
            regionInfo: {
                regionName: ""
            },
            area: null,
            context: null
        }
        RegionManager.Instance = this;
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleDoorInfoChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        var doorInfo = JSON.parse(JSON.stringify(this.state.doorInfo));
        doorInfo[name] = value;

        this.setState({
            doorInfo: doorInfo
        });
    }

    handleSignInfoChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        var signInfo = JSON.parse(JSON.stringify(this.state.signInfo));
        signInfo[name] = value;

        this.setState({
            signInfo: signInfo
        });
    }

    handleRegionInfoChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        var regionInfo = JSON.parse(JSON.stringify(this.state.regionInfo));
        regionInfo[name] = value;

        this.setState({
            regionInfo: regionInfo
        });
    }

    render() {
        return (
            <div>
                <div className="section">
                    <h2>Editor Options</h2>
                    <hr />
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label>Region Name: </label>
                                </td>
                                <td>
                                    <input name="name" value={this.state.name} onChange={this.handleInputChange.bind(this)}></input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>Click Type: </label>
                                </td>
                                <td>
                                    <select name="cursor" value={this.state.cursor} onChange={this.handleInputChange.bind(this)}>
                                        <option value="collider">Collider</option>
                                        <option value="jump">Jump</option>
                                        <option value="door">Door</option>
                                        <option value="sign">Sign</option>
                                        <option value="npc">Npc</option>
                                        <option value="region">Region</option>
                                        <option value="info">Info</option>
                                        <option value="clear">Clear</option>
                                    </select>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {this.state.cursor === "door" ?
                        (<div>
                            <h3>Door Options</h3>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Destination</td>
                                    </tr>
                                    <tr>
                                        <td>Map Name</td>
                                        <td>X Coord</td>
                                        <td>Y Coord</td>
                                    </tr>
                                    <tr>
                                        <td><input name="map" type="text" onChange={this.handleSignInfoChange.bind(this)}></input></td>
                                        <td><input name="x" type="text" onChange={this.handleSignInfoChange.bind(this)}></input></td>
                                        <td><input name="y" type="text" onChange={this.handleSignInfoChange.bind(this)}></input></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>) : null
                    }
                    {this.state.cursor === "sign" ?
                        (<div>
                            <h3>Sign Options</h3>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Sign Text</td>
                                    </tr>
                                    <tr>
                                        <td><textarea name="signText" value={this.state.signInfo.text} style={{ width: "500px", height: "100px" }}
                                            onChange={this.handleSignInfoChange.bind(this)}></textarea></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>) : null
                    }
                    {this.state.cursor === "region" ?
                        (<div>
                            <h3>Region Options</h3>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Region Name</td>
                                    </tr>
                                    <tr>
                                        <td><input name="regionName" value={this.state.regionInfo.regionName}
                                            onChange={this.handleRegionInfoChange.bind(this)}></input></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>) : null
                    }
                </div>

                <div style={{ width: "600px", height: "400px", overflow: "auto", resize: "both" }}>
                    <canvas id="RegionCanvas"
                        onClick={(event) => { this.onClick(event) }}
                        onMouseDown={(event) => { this.onMouseDown(event) }}
                        onMouseUp={(event) => { this.onMouseUp(event) }} />
                </div>
                <div className="section">
                    <h2>File Actions</h2>
                    <hr />
                    <input style={{ display: "block" }} id="jsonUpload" type="file" accept=".json"></input>
                    <button style={{ marginTop: "16px" }} onClick={this.import.bind(this)}>Import</button>
                    <button style={{ marginTop: "16px", marginLeft: "8px" }} onClick={this.export.bind(this)}>Export</button>
                </div>
            </div>
        );
    }

    componentDidMount() {
        var canvas = document.getElementById("RegionCanvas");
        canvas.width = 6528;
        canvas.height = 6400;

        var context = canvas.getContext("2d");
        this.setState({ context: context });

        RegionManager.Instance.Map = new GameMap(context);

        setTimeout(function () {
            RegionManager.Instance.renderMap();
        }, 500);

    }

    renderMap(x, y) {
        var self = RegionManager.Instance.Map;

        var map = self.maps["Kanto"].map;
        if (x != null && y != null) {
            map.renderPartial(x, y, 16, 16);
        }
        else
            map.render();
    }

    renderObject(context, object, color) {
        if (context == null || object == null)
            return;

        var posX = object.x * 16;
        var posY = object.y * 16;

        var length = (object.width != null ? object.width * 16 : 16) - 4;
        var height = (object.height != null ? object.height * 16 : 16) - 4;

        context.beginPath();
        context.lineWidth = "4";
        context.strokeStyle = color;
        context.rect(posX + 2, posY + 2, length, height);
        context.stroke();
    }

    renderRegion() {
        var context = this.state.context;
        this.renderArray(context, this.state.region.colliders, "red");
        this.renderArray(context, this.state.region.jumps, "yellow");
        this.renderArray(context, this.state.region.doors, "purple");
        this.renderArray(context, this.state.region.signs, "blue");
        this.renderArray(context, this.state.region.npcs, "green");
    }

    renderArray(context, array, color) {
        for (var i = 0; i < array.length; i++) {
            this.renderObject(context, array[i], color);
        }
    }

    onMouseDown(event) {
        var rect = event.currentTarget.getBoundingClientRect();
        var rawX = (event.clientX - rect.left);
        var rawY = (event.clientY - rect.top);
        var x = Math.floor(rawX / 16);
        var y = Math.floor(rawY / 16);

        this.setState({
            area: new Area(x, y, null, null)
        });
    }

    onMouseUp(event) {
        if (this.state.area != null) {
            var area = this.state.area;
            var rect = event.currentTarget.getBoundingClientRect();
            var rawX = (event.clientX - rect.left);
            var rawY = (event.clientY - rect.top);
            var x = Math.floor(rawX / 16);
            var y = Math.floor(rawY / 16);

            var minX = area.x < x ? area.x : x;
            var minY = area.y < y ? area.y : y;
            var maxX = area.x > x ? area.x : x;
            var maxY = area.y > y ? area.y : y;

            area.x = minX;
            area.y = minY;
            area.width = (maxX - minX) + 1;
            area.height = (maxY - minY) + 1;
        }
    }

    onClick(event) {
        var rect = event.currentTarget.getBoundingClientRect();
        var rawX = (event.clientX - rect.left);
        var rawY = (event.clientY - rect.top);
        var x = Math.floor(rawX / 16);
        var y = Math.floor(rawY / 16);
        var obj = new Location(x, y);

        if (this.state.area)
            obj = this.state.area;

        if (this.state.cursor === "collider") {
            this.state.region.colliders.push(obj);
            this.renderObject(this.state.context, obj, "red");
        }
        else if (this.state.cursor === "jump") {
            this.state.region.jumps.push(obj);
            this.renderObject(this.state.context, obj, "yellow");
        }
        else if (this.state.cursor === "door") {
            obj = new DoorLocation(x, y, this.state.doorInfo.destination);
            this.state.region.doors.push(obj);
            this.renderObject(this.state.context, obj, "purple");
        }
        else if (this.state.cursor === "sign") {
            obj = new SignLocation(x, y, this.state.signInfo.text ? this.state.signInfo.text : "This sign is not implemented");
            this.state.region.signs.push(obj);
            this.renderObject(this.state.context, obj, "blue");
        }
        else if (this.state.cursor === "npc") {
            obj = { x: x, y: y };
            this.state.region.npcs.push(obj);
            this.renderObject(this.state.context, obj, "green");
        }
        else if (this.state.cursor === "region") {
            obj = new RegionLocation(x, y, this.state.regionInfo.regionName);
            this.state.region.npcs.push(obj);
            this.renderObject(this.state.context, obj, "orange");
        }
        else if (this.state.cursor === "info") {
            //TODO
        }
        else if (this.state.cursor === "clear") {
            var self = this;
            setTimeout(function () {
                self.state.region.colliders = self.state.region.colliders.filter(function (value) { return self.checkClear(value, x, y) });

                setTimeout(function () {
                    self.state.region.jumps = self.state.region.jumps.filter(function (value) { return self.checkClear(value, x, y) });
                    setTimeout(function () {
                        self.state.region.doors = self.state.region.doors.filter(function (value) { return self.checkClear(value, x, y) });
                        setTimeout(function () {
                            self.state.region.signs = self.state.region.signs.filter(function (value) { return self.checkClear(value, x, y) });
                            setTimeout(function () {
                                self.state.region.npcs = self.state.region.npcs.filter(function (value) { return self.checkClear(value, x, y) });

                                self.renderMap();
                                setTimeout(function () {
                                    self.renderRegion();
                                });
                            });
                        });
                    });
                });
            });
        }
    }

    checkClear(value, x, y) {
        if (value.contains != null)
            return !value.contains({ x: x, y: y });
        else
            return value.x !== x || value.y !== y;
    }

    coordIsEqual(a, b) {
        return a.x === b.x && a.y === b.y;
    }

    import() {
        var self = this;
        loadFileAsJson(function (region) {
            alert("Upload Successful");
            self.renderMap();
            self.setState({
                name: region.name.replace(/_/g, " "),
                region: region
            });
            setTimeout(function () {
                self.renderRegion();
            });
        })
    }

    export() {
        var fileName = this.state.name.replace(/ /g, "_");
        var region = this.state.region;
        region.name = this.state.name;

        downloadObjectAsJson(region, fileName);
    }

}