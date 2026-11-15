# Kontrolní seznam při instalaci Raspberry Pi 3 B+ s Home Assistantem

Použití: při instalaci podle manuálu odškrtávej a do pole „zapiš“ doplň, co skutečně vidíš. Položky jsou věci, které se z textu nedaly ověřit předem (číslo v závorce je sekce manuálu).

## Příprava a první start (04, 05)
- [ ] V Raspberry Pi Imageru je položka Home Assistant OS pro Raspberry Pi 3 (64bit). Přesný název zapiš: ____________ (04.3)
- [ ] SD karta ve slotu není, RPi naběhne z USB SSD (04.2). Když ne: 14.6
- [ ] Zdroj nehlásí podpětí (senzor Raspberry Pi Power Supply Checker) (02.2)
- [ ] Adresa po startu: ☐ `http://192.168.0.11` (port 80, HA 2026.8+) ☐ `http://192.168.0.11:8123` (starší) (05.3)
- [ ] Router má DHCP rezervaci pro 192.168.0.11 (05.5)
- [ ] Zapiš české názvy v menu: Nastavení → ____________ (Doplňky/Aplikace), obchod: ____________ (06)

## Základní nastavení (06)
- [ ] Zálohy: Nastavit zálohy hotovo, **šifrovací klíč uložen mimo HA** (nouzová sada) (06.4)
- [ ] Terminal & SSH: port 22 zapnutý v kartě Síť, přihlášení funguje, příkaz `ha help` odpoví (06.7)
- [ ] Samba share: složky `config` a `backup` vidíš z Windows (`\\192.168.0.11\`) (06.6)

## MQTT a Zigbee2MQTT (07, 08, 09)
- [ ] `mqtt_user` vytvořen. Názvy voleb (Správce, Může se přihlásit jen z místní sítě) sedí: ano / ne (07.3)
- [ ] MQTT integrace se nabídla sama (varianta A): ano / ne (07.4)
- [ ] `ha hardware info` ukáže Zigbee dongle (08.2)
- [ ] Onboarding Zigbee2MQTT našel adaptér (Found Devices): ano / ne. Kanál: ____ (09.1)
- [ ] Zigbee2MQTT se připojilo k MQTT i **bez vyplněné sekce `mqtt`**: ano / ne (09.1)
- [ ] Nastavení `rtscts` / `baudrate` podle tabulky pro tvůj koordinátor (SLZB-07: `rtscts: true`) (09.1)
- [ ] Zařízení se po spárování objeví v HA (integrace `homeassistant` zapnutá) (09.4)
- [ ] Webové rozhraní Z2M se otevírá přes postranní panel (port 8099 nepotřebuješ) (09.2)
- [ ] Soubory `coordinator_backup.json`, `database.db`, `configuration.yaml` zkopírovány mimo RPi (03.5)

## Bezpečnost a zálohy (11, 12)
- [ ] 2FA zapnuto, QR kód je ve dvou zařízeních (11.3)
- [ ] Automatizace „Login attempt failed“ funguje (spouštěč: trvalé oznámení `http-login`) (11.8)
- [ ] Tailscale: autorizace přes Otevřít webové rozhraní, vypršení klíče vypnuto (11.7)
- [ ] Záloha na NAS (síťové úložiště) nebo do cloudu zdarma proběhla a je vidět (12.5, 12.6)
- [ ] **Test obnovy** zálohy proběhl (12.8)

## Provoz (13, 14)
- [ ] System Monitor ukazuje teplotu pod 60 °C a paměť do cca 70 % (13.4)
- [ ] `smartctl -a -d sat /dev/sda` funguje: ano / ne (13.1)
- [ ] Bluetooth: ☐ potřebuji ☐ vypnuto přes `dtoverlay=pi3-disable-bt` (13.3)
- [ ] HACS: ☐ aplikace Get HACS (HA do 2026.10) ☐ vestavěný Marketplace (HA 2026.11+). Jak se otevírá: ____________ (13.6)
- [ ] Příkaz `ha apps logs a0d7b954_zigbee2mqtt` funguje (14.8)
- [ ] Postup při ztrátě 2FA je připraven (SSH nastaveno předem) (14.7)

## Odkazy v kapitole 15 k ručnímu otestování
- [ ] YouTube kanály, Smarthome.cz fórum, česká Facebook skupina, e-shopy (15.8 až 15.10)
